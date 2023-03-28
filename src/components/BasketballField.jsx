import '../style/Field.css';
import React, {useState} from 'react';
import {useDrop} from 'react-dnd';
import {Arrow, Circle, Layer, Line, Stage} from 'react-konva';
import {StarWrapper} from './StarWrapper'

export function BasketballField() {
    const [players, setPlayer] = useState([])
    const [nameIter, setnameIter] = useState(12345)
    const [isPressed, setPressed] = useState(false);

    /*    const [startPoints, setStartPoints] = useState([])
        const [endPoints, setEndPoints] = useState([])
        const [draggablePoints, setDraggablePoints] = useState([])*/
    let lineMode = true
    const [lines, setLines] = useState([]) //startCoords ...mid... end Cords
    function generateName() {
        setnameIter(nameIter + 10)
        return nameIter
    }

    const [startPoint, setStartPoint] = useState({x: null, y: null});
    const [endPoint, setEndPoint] = useState({x: null, y: null});
    const [controlPoints, setControlPoints] = useState([]);

    function handleMouseDown(event) {
        if (lineMode == false) return
        const clientX = event.clientX
        const clientY = event.clientY
        setStartPoint({x: clientX, y: clientY});
        setEndPoint({x: clientX, y: clientY});
        setPressed(true)

    }

    function handleMouseMove(event) {

        if (isPressed == false) {
            return
        }

        const clientX = event.clientX
        const clientY = event.clientY
        setEndPoint({x: clientX, y: clientY});
    }

    function handleMouseUp(event) {
        if (lineMode == false) return
        setPressed(false)
        const clientX = event.clientX

        const clientY = event.clientY

        const len = Math.sqrt(Math.pow((clientX - startPoint.x), 2) + Math.pow((clientY - startPoint.y), 2))
        let alpha
        if (clientX > startPoint.x) {
            alpha = Math.atan((clientY - startPoint.y) * 1.0 / (clientX - startPoint.x))
        } else {
            if (clientY > startPoint.y) {
                alpha = Math.PI - Math.atan(Math.abs(clientY - startPoint.y) * 1.0 / Math.abs(clientX - startPoint.x))
            } else {
                alpha = -Math.PI + Math.atan(Math.abs(clientY - startPoint.y) * 1.0 / Math.abs(clientX - startPoint.x))
            }
        }

        let x1 = startPoint.x + len / 3.0 * Math.cos(alpha)
        let y1 = startPoint.y + len / 3.0 * Math.sin(alpha)

        let x2 = startPoint.x + 2 * len / 3.0 * Math.cos(alpha)
        let y2 = startPoint.y + 2 * len / 3.0 * Math.sin(alpha)


        let startx = startPoint.x
        let starty = startPoint.y
        setLines(oldLines => {
                return [...oldLines, {
                    start: {x: startx, y: starty},
                    mid: [
                        {
                            x: x1, y: y1
                        }
                        ,
                        {
                            x: x2, y: y2
                        }
                    ],
                    end: {
                        x: clientX, y: clientY
                    }
                }]
            }
        )
        setStartPoint({x: null, y: null});
        setEndPoint({x: null, y: null});


    }

    function handleControlPointDrag(index, event) {
        console.log(index)
        const {x, y} = event.target.getPosition();
        const mainIndex = Math.floor(index / 2)
        const newLines = [...lines];

        if (index % 2 == 0) {
            newLines[mainIndex].mid[0].x = x
            newLines[mainIndex].mid[0].y = y
        }
        if (index % 2 == 1) {
            newLines[mainIndex].mid[1].x = x
            newLines[mainIndex].mid[1].y = y
        }
        setLines(oldArray => {
            return newLines
        });

    }


    const [{isOver}, dropRef] = useDrop({
        accept: 'starwrapper',
        drop: (item, monitor) => {
            let newItem = {...item}
            if (newItem.name == null) {
                newItem.name = generateName();
            }
            const delta = monitor.getDifferenceFromInitialOffset();
            const initialOffset = monitor.getInitialSourceClientOffset();
            const left = Math.round(initialOffset.x + delta.x);
            const top = Math.round(initialOffset.y + delta.y - 80);

            newItem.left = left;
            newItem.top = top;
            const player = {
                name: newItem.name,
                left: newItem.left,
                top: newItem.top,
            }


            if (!players.includes(player)) {

                setPlayer(oldArray => {
                    const filteredArray = oldArray.filter(p => p.name !== newItem.name);
                    return [...filteredArray, newItem];
                });
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <div id="field-container" ref={dropRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}>

            <Stage width={window.innerWidth} height={window.innerHeight} className="line-container">

                <Layer>
                    {startPoint && endPoint && (
                        <>
                            {lines.map((line, index) => (
                                <Line
                                    points={[line.start.x, line.start.y, ...line.mid.flatMap((p) => [p.x, p.y]), line.end.x, line.end.y]}
                                    stroke="black"
                                    strokeWidth={2}
                                    tension={0.2}
                                    draggable

                                />))
                            }
                            {
                            <Line
                                points={[startPoint.x, startPoint.y, ...controlPoints.flatMap((p) => [p.x, p.y]), endPoint.x, endPoint.y]}
                                stroke="black"
                                strokeWidth={2}
                                tension={0.2}
                                draggable
                            />


                            }
                            {lines.map((line) => (
                                <Arrow
                                    points={[line.start.x, line.start.y, ...line.mid.flatMap((p) => [p.x, p.y]), line.end.x, line.end.y]}
                                    stroke="black"
                                    fill="black"
                                    pointerLength={10}
                                    pointerWidth={10}
                                    tension={0.2}

                                />))}
                            {lines.map((line, index) => (
                                <>
                                    <Circle
                                        key={index * 2}
                                        x={line.mid[0].x}
                                        y={line.mid[0].y}
                                        radius={5}
                                        stroke="black"
                                        fill="white"
                                        strokeWidth={2}
                                        draggable
                                        onDragMove={(event) => handleControlPointDrag(index * 2, event)}
                                    />
                                    <Circle
                                        key={index * 2 + 1}
                                        x={line.mid[1].x}
                                        y={line.mid[1].y}
                                        radius={5}
                                        stroke="black"
                                        fill="white"
                                        strokeWidth={2}
                                        draggable
                                        onDragMove={(event) => handleControlPointDrag(index * 2 + 1, event)}
                                    />
                                </>
                            ))}
                        </>
                    )}
                </Layer>


            </Stage>
            {players.map(player =>
                <div
                    key={player.name}
                    style={{
                        position: 'absolute',
                        left: player.left,
                        top: player.top,
                        width: '80px',
                        height: '80px',
                    }}>
                    <StarWrapper name={player.name}/>
                </div>
            )
            }


        </div>
    );
}

import '../style/Field.css';
import React, {useState} from 'react';
import {useDrop} from 'react-dnd';
import {Stage} from 'react-konva';
import {StarWrapper} from './StarWrapper'
import {SimpleArrowsHandler} from './SimpleArrowsHandler'
import {IntermitentArrowHandler} from './IntermitentArrowHandler'
import {useSelector} from "react-redux";
import {WideLineHandler} from './WideLineHandler'
import ReactLogo from '../aboba.svg';

export function BasketballField() {
    const [playersTeamBeige, setPlayersTeamBeige] = useState([])
    const [playersTeamGreen, setPlayersTeamGreen] = useState([])

    const [nameIter, setnameIter] = useState(0)
    const [isPressed, setPressed] = useState(false);

    let simpleLineMode = useSelector(state => state.basicLineMode)
    let intermittentLineMode = useSelector(state => state.intermittentLineMode)
    let wideLineMode = useSelector(state => state.wideLineMode)

    const [simpleArrowLines, setSimpleArrowLines] = useState([])
    const [intermittentArrowLines, setIntermittentArrowLines] = useState([])
    const [wideArrowLines, setWideArrowLines] = useState([])

    function generateName() {
        setnameIter(nameIter + 1)
        return nameIter
    }

    const [startPointSimpleArrow, setStartPointSimpleArrow] = useState({x: null, y: null});
    const [endPointSimpleArrow, setEndPointSimpleArrow] = useState({x: null, y: null});
    const [controlPointsSimpleArrow, setControlPointsSimpleArrow] = useState([]);


    const [startPointIntermittentArrow, setStartPointIntermittentArrow] = useState({x: null, y: null});
    const [endPointIntermittentArrow, setEndPointIntermittentArrow] = useState({x: null, y: null});
    const [controlPointsIntermittentArrow, setControlPointsIntermittentArrow] = useState([]);

    const [startPointWideArrow, setStartPointWideArrow] = useState({x: null, y: null});
    const [endPointWideArrow, setEndPointWideArrow] = useState({x: null, y: null});
    const [controlPointsWideArrow, setControlPointsWideArrow] = useState([]);


    function setStartAndEndCoords(event, funcStart, funcEnd) {
        const clientX = event.clientX
        const clientY = event.clientY - window.innerHeight * 0.1
        funcStart({x: clientX, y: clientY});
        funcEnd({x: clientX, y: clientY});
        setPressed(true)
    }

    function handleMouseDown(event) {
        if (simpleLineMode) {
            setStartAndEndCoords(event, setStartPointSimpleArrow, setEndPointSimpleArrow)
        }
        if(intermittentArrowLines) {
            setStartAndEndCoords(event, setStartPointIntermittentArrow, setEndPointIntermittentArrow)

        }
        if(wideArrowLines) {
            setStartAndEndCoords(event, setStartPointWideArrow, setEndPointWideArrow)
        }
    }


    function updateStartAndEndCoords(event, setCoordsFunc) {
        const clientX = event.clientX
        const clientY = event.clientY - window.innerHeight * 0.1
        setCoordsFunc({x: clientX, y: clientY});
    }

    function handleMouseMove(event) {

        if (isPressed == false) {
            return
        }
        if (simpleLineMode) {
            updateStartAndEndCoords(event, setEndPointSimpleArrow)
        }
        if (intermittentLineMode) {
            updateStartAndEndCoords(event, setEndPointIntermittentArrow)
        }
        if(wideLineMode) {
            updateStartAndEndCoords(event, setEndPointWideArrow)

        }

    }


    function findControlPointsAndSetPointsCoords(event, startPointObj, setLinesFunc, setStartFunc, setEndFunc) {
        const clientX = event.clientX

        const clientY = event.clientY - window.innerHeight * 0.1

        const len = Math.sqrt(Math.pow((clientX - startPointObj.x), 2) + Math.pow((clientY - startPointObj.y), 2))
        let alpha
        if (clientX > startPointObj.x) {
            alpha = Math.atan((clientY - startPointObj.y) * 1.0 / (clientX - startPointObj.x))
        } else {
            if (clientY > startPointObj.y) {
                alpha = Math.PI - Math.atan(Math.abs(clientY - startPointObj.y) * 1.0 / Math.abs(clientX - startPointObj.x))
            } else {
                alpha = -Math.PI + Math.atan(Math.abs(clientY - startPointObj.y) * 1.0 / Math.abs(clientX - startPointObj.x))
            }
        }

        let x1 = startPointObj.x + len / 3.0 * Math.cos(alpha)
        let y1 = startPointObj.y + len / 3.0 * Math.sin(alpha)

        let x2 = startPointObj.x + 2 * len / 3.0 * Math.cos(alpha)
        let y2 = startPointObj.y + 2 * len / 3.0 * Math.sin(alpha)


        let startx = startPointObj.x
        let starty = startPointObj.y
        setLinesFunc(oldLines => {
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
        setStartFunc({x: null, y: null})
        setEndFunc({x: null, y: null})

    }

    function handleMouseUp(event) {
        setPressed(false)

        if (simpleLineMode) {
            findControlPointsAndSetPointsCoords(event, startPointSimpleArrow, setSimpleArrowLines, setStartPointSimpleArrow, setEndPointSimpleArrow)
        }
        if (intermittentLineMode) {
            findControlPointsAndSetPointsCoords(event, startPointIntermittentArrow, setIntermittentArrowLines, setStartPointIntermittentArrow, setEndPointIntermittentArrow)
        }
        if (wideLineMode) {
            findControlPointsAndSetPointsCoords(event, startPointWideArrow, setWideArrowLines, setStartPointWideArrow, setEndPointWideArrow)
        }


    }

    function setNewCoordsForControlPoints(index, event, arrowLines, setLines) {
        const {x, y} = event.target.getPosition();
        const mainIndex = Math.floor(index / 4)
        const newLines = [...arrowLines];
        if (index % 4 == 0) {
            newLines[mainIndex].start.x = x
            newLines[mainIndex].start.y = y
        }
        if (index % 4 == 1) {
            newLines[mainIndex].mid[0].x = x
            newLines[mainIndex].mid[0].y = y
        }
        if (index % 4 == 2) {
            newLines[mainIndex].mid[1].x = x
            newLines[mainIndex].mid[1].y = y
        }
        if (index % 4 == 3) {
            newLines[mainIndex].end.x = x
            newLines[mainIndex].end.y = y
        }
        setLines(oldArray => {
            return newLines
        });
    }

    function handleSimpleLineControlPointDrag(index, event) {

        setNewCoordsForControlPoints(index, event, simpleArrowLines, setSimpleArrowLines)

    }

    function handleIntermittentLineControlPointDrag(index, event) {
        setNewCoordsForControlPoints(index, event, intermittentArrowLines, setIntermittentArrowLines)

    }
    function handleWideLineControlPointDrag(index, event) {
        setNewCoordsForControlPoints(index, event, wideArrowLines, setWideArrowLines)

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


            if (!playersTeamBeige.includes(player)) {

                setPlayersTeamBeige(oldArray => {
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

                <SimpleArrowsHandler startPoint={startPointSimpleArrow} endPoint={endPointSimpleArrow}
                                     lines={simpleArrowLines}
                                     handleControlPointDrag={handleSimpleLineControlPointDrag}
                                     controlPoints={controlPointsSimpleArrow}/>
                <IntermitentArrowHandler startPoint={startPointIntermittentArrow} endPoint={endPointIntermittentArrow}
                                         lines={intermittentArrowLines}
                                         handleControlPointDrag={handleIntermittentLineControlPointDrag}
                                         controlPoints={controlPointsIntermittentArrow}/>
                <WideLineHandler startPoint={startPointWideArrow} endPoint={endPointWideArrow}
                                         lines={wideArrowLines}
                                         handleControlPointDrag={handleWideLineControlPointDrag}
                                         controlPoints={controlPointsWideArrow}/>

            </Stage>
            {playersTeamBeige.map(player =>
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

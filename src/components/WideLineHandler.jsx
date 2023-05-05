import '../style/Field.css';
import React, {useState, useEffect} from 'react';
import {Arrow, Circle, Layer, Line} from 'react-konva';

export function WideLineHandler(props) {
    const {startPoint, endPoint, lines, handleControlPointDrag, controlPoints} = props


    return (
        <Layer>
            {startPoint && endPoint && (
                <>
                    {
                        <Line
                            points={[startPoint.x, startPoint.y, ...controlPoints.flatMap((p) => [p.x, p.y]), endPoint.x, endPoint.y]}
                            stroke="red"
                            strokeWidth={5}
                            tension={0.2}
                            draggable
                        />


                    }
                    {lines.map((line) => (
                        <Arrow
                            points={[line.start.x, line.start.y, ...line.mid.flatMap((p) => [p.x, p.y]), line.end.x, line.end.y]}
                            stroke="red"
                            fill="red"
                            pointerLength={15}
                            pointerWidth={15}
                            strokeWidth={5}
                            tension={0.2}

                        />))}
                    {lines.map((line, index) => (
                        <>
                            <Circle
                                key={index * 4}
                                x={line.start.x}
                                y={line.start.y}
                                radius={7}
                                stroke="red"
                                fill="white"
                                strokeWidth={2}
                                draggable
                                onDragMove={(event) => handleControlPointDrag(index * 4, event)}
                            />
                            <Circle
                                key={index * 4 + 1}
                                x={line.mid[0].x}
                                y={line.mid[0].y}
                                radius={7}
                                stroke="red"
                                fill="white"
                                strokeWidth={2}
                                draggable
                                onDragMove={(event) => handleControlPointDrag(index * 4 + 1, event)}
                            />
                            <Circle
                                key={index * 4 + 2}
                                x={line.mid[1].x}
                                y={line.mid[1].y}
                                radius={7}
                                stroke="red"
                                fill="white"
                                strokeWidth={2}
                                draggable
                                onDragMove={(event) => handleControlPointDrag(index * 4 + 2, event)}
                            />
                            <Circle
                                key={index * 4 + 3}
                                x={line.end.x}
                                y={line.end.y}
                                radius={7}
                                stroke="red"
                                fill="white"
                                strokeWidth={2}
                                draggable
                                onDragMove={(event) => handleControlPointDrag(index * 4 + 3, event)}
                            />
                        </>
                    ))}
                </>
            )}
        </Layer>
    )
}
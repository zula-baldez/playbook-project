import '../style/Field.css';
import React, {useState} from 'react';
import {useDrop} from 'react-dnd';
import {StarWrapper} from './StarWrapper'

export function BasketballField() {
    const [players, setPlayer] = useState([])
    const [{isOver}, dropRef] = useDrop({
        accept: 'starwrapper',
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const initialOffset = monitor.getInitialSourceClientOffset();
            const left = Math.round(initialOffset.x + delta.x);
            const top = Math.round(initialOffset.y + delta.y - 80);

            item.left = left;
            item.top = top;

            const player = {
                name: item.name,
                left: item.left,
                top: item.top,
            }
            if (!players.includes(player)) {

                setPlayer(oldArray => [...oldArray, player])
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (

        <div id="field-container" ref={dropRef}>


            <div className={"player-container"}>
                {players.map(player =>
                    <div className={"star-wrapper-wrapper"} style={{

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

        </div>

    );
}
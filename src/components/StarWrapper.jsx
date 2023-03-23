import { ReactComponent as StarComp } from '../star_4.svg';
import { useDrag } from 'react-dnd'

export function StarWrapper({name}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        item : {name : name},
        type: 'starwrapper',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return(
        <div className="star-wrapper" ref={drag}>
            <StarComp/>
        </div>
    )
}

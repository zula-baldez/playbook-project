import { ReactComponent as StarComp } from './star_4.svg';
import { useDrag } from 'react-dnd'

export function StarWrapper() {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'starwrapper',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    return(
        <div className="StarWrapper" ref={drag}>
            <StarComp/>
        </div>
    )
}

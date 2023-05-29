import Events from "./Events"
import Attendees from "./Attendees"
import Organizers from './Organizers'

export default function Page() {
    return (
        <div>
            <div>
                Admin
            </div>
            <div>
                <Events />
                <Attendees />
                <Organizers />
            </div>
        </div>
    )
}
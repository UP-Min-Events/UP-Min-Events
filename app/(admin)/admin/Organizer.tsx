export default function Attendee({
    firstName,
    lastName,
    id
}:{
    firstName: string
    lastName: string
    id: string
}) {
    return(
        <div>
            <div>{firstName} {lastName}</div>
            <div>{id}</div>
        </div>
    )
}
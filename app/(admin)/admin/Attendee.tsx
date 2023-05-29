export default function Attendee({
    firstName,
    lastName,
    studentNumber,
    id
}:{
    firstName: string
    lastName: string
    studentNumber: string
    id: string
}) {
    return(
        <div>
            <div>{firstName} {lastName}</div>
            <div>{studentNumber}</div>
            <div>{id}</div>
        </div>
    )
}
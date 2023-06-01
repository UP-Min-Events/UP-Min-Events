export default function Attendee({
    firstName,
    lastName,
    studentNumber,
    id,
    deleteItem
}:{
    firstName: string
    lastName: string
    studentNumber: string
    id: string
    deleteItem: (id: string) => Promise<void>
}) {

    const handleDelete = () => {
        deleteItem(id)
    }

    return(
        <div>
            <div>{firstName} {lastName}</div>
            <div>{studentNumber}</div>
            <div>{id}</div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}
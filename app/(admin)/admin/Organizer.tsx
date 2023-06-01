export default function Attendee({
    firstName,
    lastName,
    id,
    deleteItem,
}:{
    firstName: string
    lastName: string
    id: string
    deleteItem: (id: string) => Promise<void>
}) {

    const handleDelete = () => {
        deleteItem(id)
    }

    return(
        <div>
            <div>{firstName} {lastName}</div>
            <div>{id}</div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}
export default function Event({ 
    name, 
    id,
    deleteItem,
}: {
    name: string;
    id: string;
    deleteItem: (id: string) => Promise<void>;
}) {

    const handleDelete = () => {
        deleteItem(id)
    }

    return(
        <div>
            <div>{name}</div>
            <div>{id}</div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}
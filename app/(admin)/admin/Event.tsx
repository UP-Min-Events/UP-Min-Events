export default function Event({ 
    name, 
    id
}: {
    name: string;
    id: string;
}) {
    return(
        <div>
            <div>{name}</div>
            <div>{id}</div>
        </div>
    )
}
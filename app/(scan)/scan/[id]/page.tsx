import ProcessOps from "./ProcessOps"

export default function Page({ params } : { params: { id: string } }) {
    return <ProcessOps id={params.id} />
}
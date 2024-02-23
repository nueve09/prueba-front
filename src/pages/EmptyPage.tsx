interface Props {
    title: string
}

export const EmptyPage = ({ title }: Props) => {
    return (
        <>
            <h1>{title}</h1>
        </>
    )
}
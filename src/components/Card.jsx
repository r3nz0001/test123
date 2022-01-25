function Card({ element }) {
  const { name, tag, url } = element

  return (
    <div className="overflow-hidden rounded-3xl bg-white">
      <img
        src={url}
        alt={name}
        className="h-44 min-h-[176px] w-80 min-w-[320px] object-cover"
      />
      <div className="p-4">
        <h2>{name}</h2>
        <p className="text-sm text-gray-500">{tag}</p>
      </div>
    </div>
  )
}

export default Card

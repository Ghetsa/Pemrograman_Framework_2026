const MainSection = () => {
  return (
    <section className="py-12 px-6 bg-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Daftar Produk
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-2">Produk 1</h3>
          <p className="text-gray-600 mb-4">
            Deskripsi singkat produk pertama.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Detail
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-2">Produk 2</h3>
          <p className="text-gray-600 mb-4">
            Deskripsi singkat produk kedua.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Detail
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-2">Produk 3</h3>
          <p className="text-gray-600 mb-4">
            Deskripsi singkat produk ketiga.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Detail
          </button>
        </div>
      </div>
    </section>
  )
}

export default MainSection
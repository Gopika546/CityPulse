'use client';

export default function CityMap() {
  const sectors = [
    { id: 1, name: 'Sector 1', x: 20, y: 30, issues: 2, color: 'text-red-500' },
    { id: 2, name: 'Sector 2', x: 45, y: 25, issues: 1, color: 'text-yellow-500' },
    { id: 3, name: 'Sector 3', x: 70, y: 35, issues: 0, color: 'text-green-500' },
    { id: 4, name: 'Sector 4', x: 25, y: 60, issues: 1, color: 'text-yellow-500' },
    { id: 5, name: 'Sector 5', x: 65, y: 65, issues: 1, color: 'text-yellow-500' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">City Overview Map</h3>
      <div className="relative bg-gray-100 rounded-lg h-64 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=city%20map%20overview%20with%20districts%20and%20sectors%2C%20urban%20planning%20visualization%2C%20aerial%20city%20view%20with%20marked%20zones%20and%20boundaries%2C%20clean%20modern%20cartographic%20style&width=500&height=300&seq=citymap1&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
          {sectors.map(sector => (
            <div
              key={sector.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${sector.x}%`, top: `${sector.y}%` }}
            >
              <div className="relative">
                <div className={`w-4 h-4 rounded-full ${sector.color} bg-current border-2 border-white shadow-lg`}></div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {sector.name}
                  <br />
                  {sector.issues === 0 ? 'No issues' : `${sector.issues} issue${sector.issues > 1 ? 's' : ''}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>No Issues</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span>Few Issues</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Multiple Issues</span>
        </div>
      </div>
    </div>
  );
}
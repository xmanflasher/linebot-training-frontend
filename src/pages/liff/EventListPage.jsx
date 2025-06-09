// src/pages/liff/EventListPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import PaginationTable from '../../components/PaginationTable';
import { fetchEvents } from '../../services/fetchEvents';

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [sortKey, setSortKey] = useState('date');

  const location = useLocation();

  // 讀取網址參數初始化 filterDate
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialDate = params.get('date');
    if (initialDate) {
      // 確保是 yyyy-MM-dd 格式
      const normalized = format(new Date(initialDate), 'yyyy-MM-dd');
      setFilterDate(normalized);
    }
  }, [location]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  const filtered = events.filter(event => {
    if (!filterDate) return true;
    const eventDate = format(new Date(event.date || event.start), 'yyyy-MM-dd');
    return eventDate === filterDate;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';

    if (sortKey === 'date') {
      return new Date(aVal) - new Date(bVal);
    }

    return aVal.toString().localeCompare(bVal.toString());
  });

  if (loading) return <div className="text-center mt-10">載入中...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">事件列表</h1>

      <div className="flex gap-4 mb-4 items-center">
        <input
          type="date"
          className="border p-2 rounded"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={sortKey}
          onChange={e => setSortKey(e.target.value)}
        >
          <option value="date">日期</option>
          <option value="title">標題</option>
          <option value="location">地點</option>
          <option value="type">類型</option>
        </select>
        <button
          onClick={() => setFilterDate('')}
          className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          清除篩選
        </button>
      </div>

      <PaginationTable
        data={sorted}
        columns={[
          { header: '標題', accessor: 'title' },
          { header: '日期', accessor: row => new Date(row.date || row.start).toLocaleDateString() },
          { header: '地點', accessor: 'location' },
          { header: '類型', accessor: 'type' },
        ]}
      />
    </div>
  );
}



// src/pages/liff/EventListPage.jsx
// import React, { useEffect, useState } from 'react';
// import PaginationTable from '../../components/PaginationTable';
// import { fetchEvents } from '../../services/fetchEvents';

// export default function EventListPage() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadEvents = async () => {
//       const data = await fetchEvents();
//       setEvents(data);
//       setLoading(false);
//     };
//     loadEvents();
//   }, []);

//   if (loading) return <div className="text-center mt-10">載入中...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">事件列表</h1>
//       <PaginationTable data={events} columns={[
//         { header: '標題', accessor: 'title' },
//         { header: '日期', accessor: row => new Date(row.date || row.start).toLocaleDateString() },
//         { header: '地點', accessor: 'location' },
//         { header: '類型', accessor: 'type' },
//       ]} />
//     </div>
//   );
// } 
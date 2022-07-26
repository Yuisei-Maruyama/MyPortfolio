const createData =(
  id: number,
  name: string,
  job: string,
  career: string,
  feature: string
) => {
  return { id, name, job, career, feature };
}

export const selectableTableContents = [
  createData(1, 'Maruyama Yuisei', 'Front-End Engineer', '3 Years', 'React.js'),
  createData(2, 'Maruyama Yuisei', 'Back-End Engineer', '1 Years', 'Node.js'),
  createData(3, 'Maruyama Yuisei', 'Front-End Engineer', '3 Years', 'Vue.js'),
  createData(4, 'Maruyama Yuisei', 'Front-End Engineer', '2 Years', 'TypeScript'),
];

export const tableHeadCells = [
  { id: 'id', headerName: 'ID', width: 20 },
  { id: 'name', headerName: 'Name', width: 70 },
  { id: 'job', headerName: 'Job', width: 130 },
  { id: 'career', headerName: 'Career', width: 130 },
  { id: 'feature', headerName: 'Feature', width: 130 },
]
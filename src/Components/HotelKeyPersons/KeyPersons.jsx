import hotels from '../../Data/hotels';
import DataTable from 'react-data-table-component';
import Table from '../../Components/TableComponent/Table'


const KeyPersons =(props) =>{

    const data = hotels[props.id-1].hotel_persons;
    const columns = [
        {
            name:'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
          name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
          name: 'Email',
          selector: row => row.email,
          sortable: true,
        }
    ]

    return (
        <div className="container">
            <Table columns={columns} data={data} filterBy='name' navigateLink={false} actions={false}/>
        {/* <DataTable className="text-center"
            columns={columns}
            data={data} pagination striped highlightOnHover fixedHeader customStyles={customStyles} /> */}
        </div>
    )
}

export default KeyPersons;
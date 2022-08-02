import { DeleteOutline } from "@material-ui/icons";

export const categoriesColumns = [
    { field: 'cat_id', headerName: 'ID', width: 100 ,type:'number'},
    { field: 'cat_name', headerName: 'Category Name', width: 200 },
    { field: 'cat_desc', headerName: 'Category Desc', width: 200 },
    {
      field: 'cat_icon',
      headerName: 'cat_icon',
      sortable:false,
      width: 150,
    },
    {
      field:'action',
      headerName:'Action',
      width:150,
      renderCell:(params)=>(
        <div>
          <DeleteOutline onClick={()=>{}}/>
        </div>
      )
    }
  ];
  
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(2) + '!important', minWidth: '120px !important', marginBottom: '30px !important',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    loading: {
      height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    },
    container: {
      padding: '25px',
    },
    marginBottom: {
      marginBottom: '30px',
    },
    list: {
      height: 'calc(100vh - 65px - 65px - 94px - 24px)', overflow: 'auto',
    },
  }));
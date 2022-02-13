import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  makeStyles
} from '@material-ui/core';
import { DOWNLOAD_SAMPLE_EXCEL_API_URL } from '../../constants';
import DialogProgress from './DialogProgress';
const clientEmployee = require('../../Redux/Employees/clientEmployee');
const useStyles = makeStyles((theme) => ({
  disableTransform: {
    textTransform: 'none'
  },
  importButton: {
    backgroundColor: "#1a73e8",
    color: "white",
    textTransform: 'none',
    margin: "8px",
    "&:hover": {
      backgroundColor: "#1a73e8",
    }
  }
}));
const path = require('path')
function DialogImport({ open, setOpen, setImportVCardErrors, setOpenImportVCard }) {
  const classes = useStyles();
  const [importFile, setImportFile] = useState();
  const [openProgress, setOpenProgress] = useState(false);
  const selectFile = (e) => {
    if (e === undefined) {
      return;
    }
    const extension = path.extname(e.name);
    if (extension !== ".xlsx"/* && extension !== ".vcf"*/) {
      return;
    }
    setImportFile(e)
  }
  const importEmployees = () => {
    if (importFile === undefined) {
      return;
    }
    let formData = new FormData();
    formData.append("File", importFile);
    const promise = clientEmployee.importExcel(formData)//extension === ".xlsx" ? clientEmployee.importExcel(formData) : clientEmployee.importVCard(formData);
    setOpenProgress(true)
    promise.then(
      res => {
        if (res.data.result.errorsCount > 0)
          setImportVCardErrors(true)
        else
          setImportVCardErrors(false)
        setOpenImportVCard(true);
        setImportFile()
        setOpen(false)
        setOpenProgress(false)
      }
    ).catch(err => {
      setOpenProgress(false)
    });
  }
  const cancelImport = () => {
    setImportFile()
    setOpen(false)
    setImportVCardErrors(false)

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Import Employees
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To import employees, select a xlsx file
            <br />
            <Button
              variant="contained"
              component="label"
              className={classes.importButton}
            >
              Select file
              <input
                type="file"
                name="vCard"
                accept=".xlsx"
                onChange={e => selectFile(e.target.files[0])}
                hidden />
            </Button>
            {importFile ? importFile.name : ""}
            <br />
            If you don't have Sample Excel file, you can <a style={{ color: '#2962ff', textDecoration: 'inherit' }} href={DOWNLOAD_SAMPLE_EXCEL_API_URL}>
              download it.
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancelImport}
            color="primary"
            className={classes.disableTransform}
          >
            Cancel
          </Button>
          <Button
            onClick={importEmployees}
            disabled={importFile === undefined}
            className={classes.disableTransform}
            color="primary">
            Import
          </Button>
        </DialogActions>
      </Dialog>
      {openProgress?<DialogProgress type="import" />:<React.Fragment />}
    </div>
  );
}
export default DialogImport;
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  makeStyles
} from '@material-ui/core';
import { DOWNLOAD_EXCEL_API_URL, DOWNLOAD_QRS_API_URL } from '../../constants/index';
import { useSelector } from 'react-redux';
import DialogProgress from './DialogProgress';
const FileDownload = require('js-file-download');
const clientEmployee = require('../../Redux/Employees/clientEmployee');
const useStyles = makeStyles((theme) => ({
  disableTransform: {
    textTransform: 'none'
  }
}));
function DialogExport({ open, setOpen }) {
  const classes = useStyles();
  const [openDownloadExcel, setOpenDownloadExcel] = useState(false);
  const [exportType, setExportType] = useState("vcf");
  const [openDownloadQR, setOpenDownloadQR] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [selectType, setSelectType] = useState("all");
  const Employees = useSelector(state => state.Employees);
  const handleCloseDownloadQR = () => {
    setOpenDownloadQR(false);
  };
  const handleCloseDownloadExcel = () => {
    setOpenDownloadExcel(false);
  };
  const exportEmployees = () => {
    let body = [];
    if (selectType !== "all")
      Employees.employees.forEach(element => {
        if (element.checked) {
          body.push(element._id);
        }
      });
    body = selectType === "all" ? ["all"] : body
    setOpenProgress(true)
    const promise =
      exportType === "xlsx" ?
        clientEmployee.exportExcel(body)
        : exportType === "vcf" ?
          clientEmployee.downloadVCards(body)
          : clientEmployee.downloadQRs(body);
    promise.then(res => {
      setOpenProgress(false)
      exportType === "xlsx" ?
        setOpenDownloadExcel(true)
        : exportType === "vcf" ?
          FileDownload(res.data, 'Contacts.vcf')
          :
          setOpenDownloadQR(true);
      setOpen(false)
    }).catch(err => {
      setOpenProgress(false)
    });
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Export Employees
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <RadioGroup
              required={true}
              aria-label="gender"
              name="selectType"
              id="selectType"
              value={selectType}
              onChange={e => setSelectType(e.target.value)}>
              <FormControlLabel value="selected" disabled={Employees.selectedCount === 0} control={<Radio />} label={"Selected Employee (" + Employees.selectedCount + ")"} />
              <FormControlLabel value="all" control={<Radio />} label={"All Employee (" + Employees.count + ")"} />
            </RadioGroup>
            <Divider />
            Export as
            <RadioGroup
              required={true}
              aria-label="gender"
              name="exportType"
              id="exportType"
              value={exportType}
              onChange={e => setExportType(e.target.value)}>
              <FormControlLabel value="vcf" control={<Radio />} label="VCard" />
              <FormControlLabel value="xlsx" control={<Radio />} label="Excel" />
              <FormControlLabel value="qr" control={<Radio />} label="QR" />
            </RadioGroup>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            className={classes.disableTransform}
            color="primary">
            Cancel
          </Button>
          <Button onClick={exportEmployees}
            className={classes.disableTransform}
            color="primary">
            Export
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDownloadExcel}
        onClose={handleCloseDownloadExcel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Download Employees
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to download the File?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDownloadExcel} color="primary">
            No
          </Button>
          <a style={{ color: '#2962ff', textDecoration: 'inherit' }} href={DOWNLOAD_EXCEL_API_URL}>
            <Button
              onClick={() => {
                handleCloseDownloadExcel();
              }}
              color="primary" autoFocus>
              Yes
            </Button>
          </a>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDownloadQR}
        onClose={handleCloseDownloadQR}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Download QRs
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to download the File?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDownloadQR} color="primary">
            No
          </Button>
          <a href={DOWNLOAD_QRS_API_URL}>
            <Button
              onClick={() => {
                handleCloseDownloadQR();
              }}
              color="primary" autoFocus>
              Yes
            </Button>
          </a>
        </DialogActions>
      </Dialog>
      {openProgress ? <DialogProgress type="export" /> : <React.Fragment />}

    </React.Fragment>
  );
}
export default DialogExport;
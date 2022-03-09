import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState, React } from 'react';
import FileList from './FileList';
import MainSidebarContent from './MainSidebarContent';
import MainSidebarHeader from './MainSidebarHeader';
import reducer from './store';
import { selectFileById, getFiles } from './store/filesSlice';

function FileManagerApp() {
    const dispatch = useDispatch();
    const selectedItem = useSelector(state => selectFileById(state, state.fileManagerApp.files.selectedItemId));

    const pageLayout = useRef(null);

    // useEffect(() => {
    //     dispatch(getFiles());
    // }, [dispatch]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <FusePageSimple
            classes={{
                root: '',
                header: 'h-0 min-h-0 sm:h-0 sm:min-h-0',
                sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
                rightSidebar: 'w-320'
            }}
            header={<div className="flex flex-col flex-1 p-8 sm:p-12 relative" />}
            content={<FileList pageLayout={pageLayout} />}
            leftSidebarVariant="temporary"
            leftSidebarHeader={<MainSidebarHeader />}
            leftSidebarContent={<MainSidebarContent />}
            ref={pageLayout}
            innerScroll
        />
    );
}

export default withReducer('fileManagerApp', reducer)(FileManagerApp);

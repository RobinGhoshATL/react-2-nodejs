import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import FilesHeader from './FilesHeader';
import FilesTable from './FilesTable';

function FileList() {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<FilesHeader />}
            content={<FilesTable />}
            innerScroll
        />
    );
}

export default withReducer('fileManagerApp', reducer)(FileList);

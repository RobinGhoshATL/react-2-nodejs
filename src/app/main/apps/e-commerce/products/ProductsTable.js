import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { getProducts, selectProducts } from '../store/productsSlice';
import ProductsTableHead from './ProductsTableHead';

function ProductsTable(props) {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(products);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    useEffect(() => {
        dispatch(getProducts()).then(() => setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        if (searchText.length !== 0) {
            setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
            setPage(0);
        } else {
            setData(products);
        }
    }, [products, searchText]);

    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleClick(item) {
        // props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
        props.history.push(`/apps/e-commerce/products/${item.id}`);
    }

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    function addDefaultSrc(ev) {
        ev.target.src =
            'data:image/jpg;base64,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';
    }

    if (loading) {
        return <FuseLoading />;
    }

    if (data.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There are no products!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <ProductsTableHead
                        selectedProductIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                        {_.orderBy(
                            data,
                            [
                                o => {
                                    switch (order.id) {
                                        case 'categories': {
                                            return o.categories[0];
                                        }
                                        default: {
                                            return o[order.id];
                                        }
                                    }
                                }
                            ],
                            [order.direction]
                        )
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((n, index) => {
                                const isSelected = selected.indexOf(n.id) !== -1;
                                let srno;
                                if (page === 0) {
                                    srno = index + 1;
                                } else {
                                    srno = 1;
                                    srno = srno + index + page * rowsPerPage;
                                }

                                return (
                                    <TableRow
                                        className="h-68"
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isSelected}
                                    >
                                        {/* <TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell> */}
                                        <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                                            {srno}
                                        </TableCell>

                                        <TableCell
                                            className="w-52 px-4 md:px-0"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            <div id="picture">
                                                <img
                                                    className="w-full block rounded"
                                                    style={{ height: 'auto' }}
                                                    src={n.small_image}
                                                    onError={addDefaultSrc}
                                                    alt={n.name}
                                                />
                                            </div>
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                                            {n.name}
                                        </TableCell>
                                        <TableCell
                                            className="p-4 md:p-16 cursor-pointer"
                                            component="th"
                                            scope="row"
                                            align="left"
                                        >
                                            <Tooltip title={n.description} aria-label="add">
                                                <p className="desc-lenght">{n.description}</p>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                                            <span className="retail-line">${n.retail_price}</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <span className="sale-text">${n.sale_price}</span>
                                        </TableCell>
                                        <TableCell
                                            className="p-4 md:p-16 cursor-pointer"
                                            component="th"
                                            scope="row"
                                            align="left"
                                            onClick={event => handleClick(n)}
                                        >
                                            {n.active ? (
                                                <Icon className="text-green text-20">edit</Icon>
                                            ) : (
                                                <Icon className="text-red text-20">edit</Icon>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                className="flex-shrink-0 border-t-1"
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(ProductsTable);

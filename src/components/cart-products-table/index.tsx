import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function CartProductsTable() {

    const [products, setProducts] = useState<Array<any>>([])

    useEffect(() => {
        var token = localStorage.getItem('token');

        const fetchProducts = async () => {
            await axios.get(
                'http://localhost:3333/cart-products/' + router.query.id,
                {
                    headers: {
                        token: token
                    }
                }
            ).then((resp) => {
                if (resp?.status === 200) {
                    if (resp.data.products) {
                        const data: any = [];
                        resp.data.products.forEach((product: any) => {
                            data.push(product);
                        });
                        setProducts(data);
                    }
                }
            })
        }

        fetchProducts();

    }, [])


    const router = useRouter()

    const editProduct = (cart_id: any, product_id: any) => {
        router.push(`/carts/products/edit?cart_id=${cart_id}&product_id=${product_id}`);
    };

    return (
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Nome</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Valor Unitario</TableCell>
                        <TableCell align="right">Valor Total</TableCell>
                        <TableCell align="right">Criado em</TableCell>
                        <TableCell align="right">Modificado em</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products?.map((row) => (
                        <TableRow
                            key={row.details.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row.details.name}</TableCell>
                            <TableCell align="right">{row.item.quantity}</TableCell>
                            <TableCell align="right">{row.item.unity_price}</TableCell>
                            <TableCell align="right">{row.item.total_price}</TableCell>
                            <TableCell align="right">{row.item.created_at}</TableCell>
                            <TableCell align="right">{row.item.updated_at}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" onClick={() => editProduct(row.item.cart_id, row.item.product_id)}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

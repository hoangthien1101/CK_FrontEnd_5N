import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import addCart from "../../components/Cart";
import { NumericFormat } from "react-number-format";

function ProductDetail() {
    const [productDetail, setproductDetail] = useState([]);
    const [proHot, setProHot] = useState([]);
    const { id } = useParams();

    const detail = async () => {
        await axios.get(`http://localhost:6060/apiproduct/${id}`).then((res) => {
            setproductDetail(res.data);
        });
    };
    const hot = async () => {
        await axios.get('http://localhost:6060/apiproduct/cate2').then((res) => {
            setProHot(res.data);
        });
    };

    useEffect(() => {
        detail();
        hot();
    }, [id]);

    return ( 
        <>
           {productDetail.map((data, index) => {
                return (
                    <div className="detail" key={index}>
                        <div className="detail-left">
                            <img src={'/images/' + data.avatar} alt="" />
                        </div>
                        <div className="detail-right">
                            <h2>{data.name}</h2>
                            <p>
                                Giá:{' '}
                                <span className="gia">
                                    <NumericFormat
                                        value={data.price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'đ'}
                                    />
                                </span>
                            </p>
                            <p>
                                Nhãn hiệu: <span className="hang">{data.cateName}</span>
                            </p>
                            <p>{data.mota}</p>
                            <button onClick={() => addCart(data)}>
                                <i className="fa-solid fa-cart-shopping"></i> Add to cart
                            </button>
                        </div>
                    </div>
                );
            })}

            <div className="hot-product">
                <div className="title">
                    <h2>Product Hot</h2>
                    <Link to='shop'>See</Link>
                </div>
                <div className="product-item">
                    {proHot.map((data, index) => {
                        return (
                            <div className="item" key={index}>
                                <img src="/images/promotional.png" alt="" className="icon-hot" />
                                <img src={'/images/' + data.avatar} alt="" />
                                <div className="item-title">
                                    <h3>{data.name}</h3>
                                    <p>
                                        <NumericFormat
                                            value={data.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'đ'}
                                        /> 
                                    </p>
                                </div>
                                <Link to={'/productdetail/' + data.productId}>
                                    <i className="fa-solid fa-eye"></i>
                                </Link>
                                <a onClick={() =>  addCart(data)}>
                                    <i className="fa-solid fa-cart-arrow-down"></i>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
            <nav className="category-product">
                <ul>
                    <li>
                        <img src="/images/logo_CARNIVAL.png" alt="" />
                    </li>
                    <li>
                        <img src="/images/logo_LOBINNI.png" alt="" />
                    </li>
                    <li>
                        <img src="/images/logo_TEINTOP.png" alt="" />
                    </li>
                    <li>AOUKE</li>
                </ul>
            </nav>
        </>
     );
}

export default ProductDetail;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Image, Rate, Button, Radio, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { selectedProduct, remove_SelectedProduct } from "../../actions/product";
import { addToCart } from "../../actions/cart";
const { Title, Text } = Typography;
const ProductDetail = () => {
  const { productId } = useParams();
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId && productId !== "") {
      dispatch(selectedProduct(productId))
        .then(() => {
          //msg.success(`Get  product details have id : ${productId}`);
          //msg.success(message);
        })
        .catch(() => {
          //msg.error(`Get product have id ${productId} failed`);
        });
    }
    return () => {
      dispatch(remove_SelectedProduct());
    };
  }, [dispatch, productId]);
  const [size, setSize] = useState(null);
  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
  };
  const sizeButtonStyle = (s) => {
    if (size === s) {
      return {
        background: "pink",
        color: "#fff",
        borderColor: "#f00",
      };
    }
    return {};
  };

  return (
    <div style={{ padding: 10 }}>
      {product === null ? (
        <div>Loading ....</div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              xl={8}
              className="center-image-productDetails"
            >
              <Image src={product.image} alt={product.name} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Card>
                <Title level={3}>{product.name}</Title>
                <Rate disabled allowHalf defaultValue={product.rate} />

                <Row justify="space-between" align="middle">
                  <Col>
                    {product.sales ? (
                      <>
                        <Text style={{ fontSize: "30px" }} strong type="danger">
                          {" "}
                          $
                          {parseFloat(
                            product.price -
                              (product.price * product.sales.percent) / 100
                          ).toFixed(2)}{" "}
                          {"  "}
                        </Text>
                        <Text
                          style={{ fontSize: "30px", color: "#ccc" }}
                          delete
                        >
                          ${parseFloat(product.price).toFixed(2)}
                        </Text>
                      </>
                    ) : (
                      <Text style={{ fontSize: "30px" }} strong type="danger">
                        {" "}
                        ${parseFloat(product.price).toFixed(2)}
                      </Text>
                    )}
                  </Col>
                </Row>

                <Text type="secondary">{product.description}</Text>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Text strong>Size:</Text>
                    <br />
                    <Radio.Group onChange={handleSizeChange} value={size}>
                      {Object.entries(product.sizeTable)
                        .filter(
                          ([key, value]) => key.startsWith("s") && value !== 0
                        )
                        .map(([key]) => key.slice(1))
                        .sort((a, b) => b.localeCompare(a))
                        .slice(1)
                        .sort()
                        .map((size) => (
                          <Radio.Button
                            key={size}
                            value={size}
                            style={sizeButtonStyle(size)}
                            disabled={product.sizeTable[`s${size}`] === 0}
                            className="hoverable-radio-button"
                          >
                            {size}
                          </Radio.Button>
                        ))}
                    </Radio.Group>
                  </Col>
                  {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Text strong>Color:</Text>
                  <br />
                  {colors.map((color) => (
                    <Button
                      type="text"
                      key={color}
                      style={{
                        background: color,
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  ))}
                </Col> */}
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Text strong>Quantity:</Text>
                    <br />
                    <Text>{product.stock}</Text>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <AddToCartButton product={product} size={size} />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
const AddToCartButton = (props) => {
  let { product, size } = props;

  if (product.sales) {
    product = {
      ...product,
      price: product.price - (product.price * product.sales.percent) / 100,
    };
  }
  const { productId, name, image, quantity, price } = product;
  const selectedFields = { productId, name, image, quantity, price };
  const dispatch = useDispatch();
  return (
    <Button
      style={{ background: "var(--primary-color)", color: "white" }}
      size="large"
      disabled={!size}
      onClick={() => {
        dispatch(addToCart(selectedFields, parseInt(size)));
      }}
    >
      <ShoppingCartOutlined />
      &nbsp; Add to Cart
    </Button>
  );
};
export default ProductDetail;

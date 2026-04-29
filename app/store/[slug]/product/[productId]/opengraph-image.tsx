import { ImageResponse } from "next/og";
import { getProductById, getStoreBySlug } from "@/lib/api/storefront";

export const alt = "Product Preview";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;
  const product = await getProductById(slug, productId);
  const store = await getStoreBySlug(slug);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          Product Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          backgroundImage: "radial-gradient(circle at 25px 25px, #f8f9fa 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f8f9fa 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "1050px",
            height: "520px",
            backgroundColor: "white",
            borderRadius: "32px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.1)",
            padding: "50px",
            border: "1px solid #f0f0f0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent Bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "12px",
              background: "linear-gradient(to bottom, #365BEB, #9233EA)",
            }}
          />

          {/* Product Image Section */}
          <div
            style={{
              display: "flex",
              width: "420px",
              height: "420px",
              backgroundColor: "#f9fafb",
              borderRadius: "24px",
              overflow: "hidden",
              marginRight: "50px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              border: "1px solid #f3f4f6",
            }}
          >
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", color: "#d1d5db", fontSize: "160px" }}>📦</div>
            )}
          </div>

          {/* Content Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              height: "420px",
              padding: "10px 0",
            }}
          >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                  alignItems: "center",
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#365BEB",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                {store?.logoUrl ? (
                  <img
                    src={store.logoUrl}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "6px",
                      marginRight: "10px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      background: "linear-gradient(135deg, #365BEB 0%, #9233EA 100%)",
                      borderRadius: "6px",
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {store?.storeName?.charAt(0).toUpperCase() || "W"}
                  </div>
                )}
                {store?.storeName || "Webtray Store"}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "68px",
                  fontWeight: "900",
                  color: "#111827",
                  lineHeight: 1.05,
                  marginBottom: "24px",
                  letterSpacing: "-0.03em",
                }}
              >
                {product?.name || "Product"}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "22px",
                  color: "#4b5563",
                  lineHeight: 1.5,
                  overflow: "hidden",
                  fontWeight: "400",
                }}
              >
                {product?.description || "Discover premium quality and exceptional value with our curated collection."}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                marginTop: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", fontSize: "16px", color: "#9ca3af", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase" }}>Price</div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "56px",
                    fontWeight: "900",
                    color: "#111827",
                    letterSpacing: "-0.02em",
                  }}
                >
                  NGN {parseFloat(product?.price || "0").toLocaleString()}
                </div>
              </div>
              
              <div
                style={{
                  display: "flex",
                  padding: "16px 50px",
                  background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
                  color: "white",
                  borderRadius: "100px",
                  fontSize: "20px",
                  fontWeight: "700",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  width: "220px",
                  justifyContent: "center",
                }}
              >
                Buy Now
              </div>
            </div>
          </div>
        </div>

        {/* Branding Footer */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            color: "#9ca3af",
            fontWeight: "500",
          }}
        >
          <span style={{ display: "flex" }}>Powered by</span>
          <span style={{ marginLeft: "6px", fontWeight: "800", color: "#111827", display: "flex" }}>webtray.ng</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

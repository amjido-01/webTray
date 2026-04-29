import { ImageResponse } from "next/og";
import { getStoreBySlug, getStoreProducts } from "@/lib/api/storefront";

export const alt = "Store Preview";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  const products = await getStoreProducts(slug);

  if (!store) {
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
          Store Not Found
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
        {/* Main Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "1000px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "40px",
            boxShadow: "0 30px 100px rgba(0,0,0,0.08)",
            padding: "60px",
            border: "1px solid #f0f0f0",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Gradient Accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(to right, #365BEB, #9233EA)",
            }}
          />

          {/* Store Icon/Logo Placeholder */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              background: "linear-gradient(135deg, #365BEB 0%, #9233EA 100%)",
              borderRadius: "30px",
              marginBottom: "30px",
              fontSize: "60px",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 10px 20px rgba(54, 91, 235, 0.2)",
            }}
          >
            {store?.logoUrl ? (
              <img
                src={store.logoUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "30px",
                }}
              />
            ) : (
              store?.storeName?.charAt(0).toUpperCase() || "W"
            )}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "80px",
              fontWeight: "900",
              color: "#111827",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            {store?.storeName || "Webtray Store"}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#4b5563",
              maxWidth: "800px",
              marginBottom: "50px",
              lineHeight: 1.4,
              fontWeight: "400",
            }}
          >
            {store?.description || `Welcome to ${store?.storeName || "our store"}. Discover our latest collections and premium products.`}
          </div>

          {/* Featured Products Bar */}
          {products.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {products.slice(0, 3).map((p: any) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#f9fafb",
                    padding: "12px 20px",
                    borderRadius: "20px",
                    border: "1px solid #f3f4f6",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#e5e7eb",
                      borderRadius: "10px",
                      marginRight: "12px",
                      overflow: "hidden",
                    }}
                  >
                    {p.images?.[0] && (
                      <img
                        src={p.images[0]}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div style={{ display: "flex", fontSize: "16px", fontWeight: "600", color: "#374151" }}>
                    {p.name.length > 15 ? p.name.substring(0, 15) + "..." : p.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Branding */}
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
          <span style={{ display: "flex" }}>Experience smart inventory at</span>
          <span 
            style={{ 
              marginLeft: "8px", 
              fontWeight: "800", 
              color: "#111827",
              letterSpacing: "-0.01em",
              display: "flex"
            }}
          >
            webtray.ng
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

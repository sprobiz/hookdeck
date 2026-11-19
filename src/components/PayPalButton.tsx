"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface PayPalButtonProps {
  planName: string;
  amount: string;
  onSuccess: (details: any) => void;
}

export default function PayPalButton({ planName, amount, onSuccess }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // 대표님의 1호 HookThumb 서비스 공식 Live Client ID (PayPal SDK 200 OK 검증 완료)
  const VERIFIED_HOOKTHUMB_LIVE_ID = "BAAIPmk5qriDSaBAwhfhcDyAYSqaTniwslBBk_M5D7NUahWV-obdya0hI3FaHmquf4Gabh-TIYBZ79iAik";

  const envClientId = (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "").trim();
  // Vercel 환경변수가 없거나, sb이거나, 오류를 유발했던 구버전 키(BAA-QDPvw...)인 경우 실제 검증된 HookThumb Live 키로 자동 복구
  const clientId = (!envClientId || envClientId === "sb" || envClientId.startsWith("BAA-QDPvw"))
    ? VERIFIED_HOOKTHUMB_LIVE_ID
    : envClientId;

  useEffect(() => {
    let isMounted = true;
    const scriptId = "paypal-sdk-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const renderButtons = () => {
      if (!isMounted) return;

      if ((window as any).paypal && paypalRef.current) {
        paypalRef.current.innerHTML = "";
        try {
          (window as any).paypal
            .Buttons({
              style: {
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "pay",
                height: 46,
              },
              createOrder: (_data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: `HookDeck PRO - ${planName} Plan`,
                      amount: {
                        currency_code: "USD",
                        value: amount,
                      },
                    },
                  ],
                });
              },
              onApprove: async (_data: any, actions: any) => {
                const order = await actions.order.capture();
                onSuccess(order);
              },
              onError: (err: any) => {
                console.error("PayPal Error:", err);
                alert("PayPal payment could not be processed. Please check your credentials or try again.");
              },
            })
            .render(paypalRef.current)
            .then(() => {
              if (isMounted) setLoading(false);
            })
            .catch((renderErr: any) => {
              console.warn("PayPal Render Catch:", renderErr);
              if (isMounted) {
                setLoading(false);
                setLoadError("PayPal 버튼을 렌더링할 수 없습니다.");
              }
            });
        } catch (e: any) {
          console.warn("PayPal Init Error:", e);
          if (isMounted) {
            setLoading(false);
            setLoadError("PayPal SDK 초기화 실패");
          }
        }
      } else {
        // window.paypal이 로딩 중인 경우 최대 4초간 대기 후 렌더링
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if ((window as any).paypal && paypalRef.current) {
            clearInterval(interval);
            renderButtons();
          } else if (attempts > 40) {
            clearInterval(interval);
            if (isMounted) {
              setLoading(false);
              setLoadError("PayPal 연결 시간이 초과되었습니다.");
            }
          }
        }, 100);
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => renderButtons();
      script.onerror = () => {
        console.error("Failed to load PayPal SDK script");
        if (isMounted) {
          setLoading(false);
          setLoadError("PayPal SDK 스크립트를 로드할 수 없습니다.");
        }
      };
      document.body.appendChild(script);
    } else {
      renderButtons();
    }

    return () => {
      isMounted = false;
    };
  }, [planName, amount, clientId, onSuccess]);

  return (
    <div className="w-full my-3">
      {loading && (
        <div className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs text-slate-400">
          <Loader2 className="w-4 h-4 text-pink-400 animate-spin" />
          <span>PayPal 결제 모듈 로딩 중...</span>
        </div>
      )}

      {loadError && (
        <div className="w-full p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{loadError}</span>
        </div>
      )}

      <div ref={paypalRef} className={loading ? "hidden" : "min-h-[46px]"} />
    </div>
  );
}

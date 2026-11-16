"use client";

import { useEffect, useRef } from "react";

interface PayPalButtonProps {
  planName: string;
  amount: string;
  onSuccess: (details: any) => void;
}

export default function PayPalButton({ planName, amount, onSuccess }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"; // 'sb' for sandbox preview

  useEffect(() => {
    // 이미 로드된 스크립트가 있는지 확인
    const scriptId = "paypal-sdk-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const renderButtons = () => {
      if ((window as any).paypal && paypalRef.current) {
        paypalRef.current.innerHTML = ""; // 기존 버튼 청소
        try {
          (window as any).paypal
            .Buttons({
              style: {
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "pay",
                height: 44,
              },
              createOrder: (_data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: `MagicDeck AI - ${planName} Plan`,
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
                alert("PayPal 결제 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
              },
            })
            .render(paypalRef.current);
        } catch (e) {
          console.warn("PayPal Render Error:", e);
        }
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => renderButtons();
      document.body.appendChild(script);
    } else {
      renderButtons();
    }
  }, [planName, amount, clientId, onSuccess]);

  return (
    <div className="w-full my-3">
      <div ref={paypalRef} className="min-h-[44px]" />
    </div>
  );
}

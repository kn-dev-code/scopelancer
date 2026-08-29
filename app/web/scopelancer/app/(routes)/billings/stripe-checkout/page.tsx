import { useTranslations } from "next-intl";

const StripeCheckout = () => {
  const t = useTranslations();
  return <div>{t("stripeCheckout.title")}</div>;
};

export default StripeCheckout;

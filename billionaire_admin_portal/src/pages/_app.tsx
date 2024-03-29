import "@/styles/globals.css";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "react-toastify/dist/ReactToastify.css";
import "@assets/main.css";
import ErrorMessage from "@/components/ui/error-message";
import PageLoader from "@/components/ui/page-loader/page-loader";
import { SettingsProvider } from "@/contexts/settings.context";
import { useSettingsQuery } from "@/data/settings/use-settings.query";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalProvider } from "@components/ui/modal/modal.context";
import { UIProvider } from "@contexts/ui.context";
import { Hydrate } from "react-query/hydration";
import PrivateRoute from "@utils/private-route";
import { ToastContainer } from "react-toastify";
import ManagedModal from "@components/ui/modal/managed-modal";
import DefaultSeo from "@components/ui/default-seo";
import { appWithTranslation } from "next-i18next";
import { ReactQueryDevtools } from "react-query/devtools";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const Noop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <>{children}</>
  );

  const AppSettings: React.FC<{ children: React.ReactNode }> = (props) => {
    const { data, isLoading: loading, error } = useSettingsQuery();
    if (loading) return <PageLoader />;
    if (error) return <ErrorMessage message={error.message} />;
    return <SettingsProvider initialValue={data?.options} {...props} />;
  };
  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppSettings>
          <UIProvider>
            <ModalProvider>
              <>
                <DefaultSeo />
                {authProps ? (
                  <PrivateRoute authProps={authProps}>
                    <Layout {...pageProps}>
                      <Component {...pageProps} />
                    </Layout>
                  </PrivateRoute>
                ) : (
                  <Layout {...pageProps}>
                    <Component {...pageProps} />
                  </Layout>
                )}
                <ToastContainer autoClose={2000} theme="colored" />
                <ManagedModal />
              </>
            </ModalProvider>
          </UIProvider>
        </AppSettings>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App)
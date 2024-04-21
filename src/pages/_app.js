import Layout from "@/components/Layout";

import { NoteProvider } from "@/context/NoteContext";
import { ThemeProvider } from "@/context/ThemeContext";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <NoteProvider>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </NoteProvider>
  );
}

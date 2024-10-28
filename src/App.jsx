import { useState } from "react";
import {
  Container,
  RowContainer,
  Input,
  Select,
  Textarea,
  Title,
  StyledPre,
  Button,
} from "./components/Styles";

function App() {
  const [headerKey, setHeaderKey] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [method, setMethod] = useState("GET");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          headerKey: headerValue,
        },
        body: method !== "GET" ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();
      const statusResponse = response.status;

      if (typeof data === "object") {
        setMessage(JSON.stringify(data, null, 2));
      } else {
        setMessage(data);
      }

      setStatus(statusResponse);
    } catch (error) {
      setMessage(`${error.message}`);
    }
  };

  return (
    <>
      <Container>
        <Title>Testando a API</Title>

        <form onSubmit={handleSubmit}>
          <RowContainer>
            <Input
              type="text"
              placeholder="Header Key"
              value={headerKey}
              onChange={(e) => setHeaderKey(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Header Value"
              value={headerValue}
              onChange={(e) => setHeaderValue(e.target.value)}
            />
          </RowContainer>

          <RowContainer>
            <Input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Select
              name="method"
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PATCH</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>\
            </Select>
          </RowContainer>

          <RowContainer>
            <Textarea
              name="body"
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></Textarea>
          </RowContainer>

          <RowContainer>
            <Button type="submit">Testar</Button>
          </RowContainer>
        </form>
        <RowContainer>
          {message && (
            <StyledPre>
              Mensagem de retorno:<br></br>
              {message}
            </StyledPre>
          )}
        </RowContainer>

        <RowContainer>{status && <p>Status: {status}</p>}</RowContainer>
      </Container>
    </>
  );
}

export default App;

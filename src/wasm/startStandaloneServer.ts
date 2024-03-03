import { NodeParserAdapter } from '@cucumber/language-service/node'
import { TextDocuments } from 'vscode-languageserver'
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'

import { CucumberLanguageServer } from '../CucumberLanguageServer'
import { Files } from '../Files'

export function startStandaloneServer(wasmBaseUrl: string, makeFiles: (rootUri: string) => Files) {
  const adapter = new NodeParserAdapter()
  const connection = createConnection(ProposedFeatures.all)
  const documents = new TextDocuments(TextDocument)
  new CucumberLanguageServer(connection, documents, adapter, makeFiles, () => undefined)
  connection.listen()
  return {
    connection,
  }
}

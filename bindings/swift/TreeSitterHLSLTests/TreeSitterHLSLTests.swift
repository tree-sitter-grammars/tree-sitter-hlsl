import XCTest
import SwiftTreeSitter
import TreeSitterHLSL

final class TreeSitterHLSLTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_hlsl())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading HLSL grammar")
    }
}

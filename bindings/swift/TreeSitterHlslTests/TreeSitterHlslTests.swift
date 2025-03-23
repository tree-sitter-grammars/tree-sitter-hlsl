import XCTest
import SwiftTreeSitter
import TreeSitterHlsl

final class TreeSitterHlslTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_hlsl())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading HLSL grammar")
    }
}

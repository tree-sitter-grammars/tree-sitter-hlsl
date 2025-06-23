// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterHLSL",
    products: [
        .library(name: "TreeSitterHLSL", targets: ["TreeSitterHLSL"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterHLSL",
            dependencies: [],
            path: ".",
            sources: sources,
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterHLSLTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterHLSL",
            ],
            path: "bindings/swift/TreeSitterHLSLTests"
        )
    ],
    cLanguageStandard: .c11
)

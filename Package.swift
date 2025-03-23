// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterHlsl",
    platforms: [.macOS(.v10_13), .iOS(.v11)],
    products: [
        .library(name: "TreeSitterHlsl", targets: ["TreeSitterHlsl"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(name: "TreeSitterHlsl",
                path: ".",
                exclude: [
                    "Cargo.toml",
                    "Makefile",
                    "binding.gyp",
                    "bindings/c",
                    "bindings/go",
                    "bindings/node",
                    "bindings/python",
                    "bindings/rust",
                    "grammar.js",
                    "package.json",
                    "package-lock.json",
                    "pyproject.toml",
                    "setup.py",
                    "test",
                    ".editorconfig",
                    ".github",
                    ".gitignore",
                    ".gitattributes",
                    ".gitmodules",
                ],
                sources: [
                    "src/parser.c",
                    "src/scanner.c",
                ],
                publicHeadersPath: "bindings/swift",
                cSettings: [.headerSearchPath("src")]),
         .testTarget(
                name: "TreeSitterHlslTests",
                dependencies: [
                    "SwiftTreeSitter",
                    "TreeSitterHlsl",
                ],
                path: "bindings/swift/TreeSitterHlslTests")
    ],
    cLanguageStandard: .c11
)

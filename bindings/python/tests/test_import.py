from unittest import TestCase

import tree_sitter
import tree_sitter_hlsl


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_hlsl.language())
        except Exception:
            self.fail("Error loading HLSL grammar")

    def test_parse(self):
        lang = tree_sitter.Language(tree_sitter_hlsl.language())
        parser = tree_sitter.Parser(lang)
        tree = parser.parse(
            bytes(
                """
        int main() { return 0; }
        """,
                "utf8"
            )
        )
        assert tree

package tree_sitter_hlsl_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_hlsl "github.com/tree-sitter-grammars/tree-sitter-hlsl/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_hlsl.Language())
	if language == nil {
		t.Errorf("Error loading HLSL grammar")
	}
}

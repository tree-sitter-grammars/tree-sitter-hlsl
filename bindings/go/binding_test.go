package tree_sitter_hlsl_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter-grammars/tree-sitter-hlsl"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_hlsl.Language())
	if language == nil {
		t.Errorf("Error loading hlsl grammar")
	}
}

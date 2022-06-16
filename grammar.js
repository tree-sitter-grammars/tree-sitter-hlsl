const CPP = require("tree-sitter-cpp/grammar")

module.exports = grammar(CPP, {
    name: 'hlsl',

    conflicts: ($, original) => original.concat([
        [$.function_definition, $.declaration],
        [$.declaration],
        [/*$.template_function,*/ $.template_type, $._expression],
    ]),

    rules: {
        _top_level_item: (_, original) => original,

        function_definition: ($, original) => seq(
            optional(
                $.hlsl_attribute,
            )
            , original
        ),

        declaration: ($, original) =>
            seq(
                repeat(
                    choice(
                        'in',
                        'out',
                        'inout',
                        $.qualifiers,
                    )
                ),
                choice(
                    seq(
                        $.identifier,
                        //optional(seq(":", $._expression)),
                        $.field_declaration_list,
                        optional($.identifier),
                        ";"
                    ),
                    original,
                )
            ),

        field_declaration: ($, original) =>
            seq(
                repeat(prec(2, choice(
                    $.attribute_declaration,
                    'in',
                    'out',
                    'inout',
                    $.qualifiers,
                ))),
                original,
            ),

        function_declarator: $ => prec.left(1,
            seq(
                field('declarator', $._declarator),
                field('parameters', $.parameter_list),
                repeat($.attribute_specifier),
                optional($.semantics),
            )),

        parameter_declaration: ($, original) =>
            seq(
                repeat(
                    choice(
                        'in',
                        'out',
                        'inout',
                        $.qualifiers,
                    )
                ),
                original,
                optional($.semantics),
            ),

        semantics: $ => seq(":", $.identifier),

        _non_case_statement: ($, original) => choice($.discard_statement, $.cbuffer_specifier, original),

        discard_statement: _ => seq('discard', ';'),
        qualifiers: _ => choice(
            'nointerpolation',
            'precise',
            'shared',
            'groupshared',
            'uniform',
            'row_major',
            'column_major',
        ),

        cbuffer_specifier: $ => prec.right(seq(
            'cbuffer',
            optional($.attribute_declaration),
            choice(
                field('name', $._class_name),
                seq(
                    optional(field('name', $._class_name)),
                    optional($.virtual_specifier),
                    optional($.base_class_clause),
                    field('body', $.field_declaration_list)
                )
            )
        )),

        hlsl_attribute: $ => seq('[',
            $._expression,
            ']'),

        for_statement: ($, original) => seq(optional($.hlsl_attribute), original),

    }
});

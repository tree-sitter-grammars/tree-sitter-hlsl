const CPP = require("tree-sitter-cpp/grammar")

module.exports = grammar(CPP, {
    name: 'hlsl',

    conflicts: ($, original) => original.concat([
        [$.function_definition, $.declaration],
        [$.declaration],
        [$._declaration_specifiers, $.parameter_declaration],
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

        declaration: $ => seq(
            repeat(
                choice(
                    'in',
                    'out',
                    'inout',
                    $.qualifiers,
                )
            ),
            $._declaration_specifiers,
            commaSep1(field('declarator', choice(
                seq($._declarator, alias(optional(seq(':', $._expression)), $.semantics)),
                $.init_declarator
            ))),
            ';'
        ),

        field_declaration: ($, original) =>
            seq(
                repeat(prec(2, choice(
                    'in',
                    'out',
                    'inout',
                    $.qualifiers,
                    $._declaration_modifiers,
                ))),
                original,
            ),

        //function_declarator: ($, original) => prec.left(seq(
        //original,
        //optional($.semantics),
        //)),

        parameter_declaration: ($, original) =>
            seq(
                repeat(
                    choice(
                        'in',
                        'out',
                        'inout',
                        $.qualifiers,
                        $._declaration_modifiers,
                    )
                ),
                original,
                optional($.semantics),
            ),

        semantics: $ => seq(":", $.identifier),

        _non_case_statement: ($, original) => choice($.discard_statement, $.cbuffer_specifier, original),

        if_statement: ($, original) => seq(optional($.hlsl_attribute), original),

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

function commaSep1(rule) {
    return seq(rule, repeat(seq(',', rule)))
}

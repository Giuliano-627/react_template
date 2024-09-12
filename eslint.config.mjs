import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

const conf = [
	...compat.extends('eslint:recommended', 'prettier'),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint
		},

		languageOptions: {
			parser: tsParser
		}
	},
	...compat
		.extends(
			'plugin:@typescript-eslint/recommended',
			'plugin:@typescript-eslint/recommended-requiring-type-checking',
			'prettier'
		)
		.map((config) => ({
			...config,
			files: ['**/*.ts', '**/*.tsx']
		})),
	{
		files: ['**/*.ts', '**/*.tsx'],

		languageOptions: {
			ecmaVersion: 5,
			sourceType: 'script',

			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: '/home/giuliano/Escritorio/code/react_template'
			}
		}
	},
	{ ignores: ['**/build/*'] }
]
export default conf

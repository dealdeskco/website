import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Ordered the way someone integrating reads it: get connected, then the reference.
const sidebars: SidebarsConfig = {
  developers: [
    'index',
    'authentication',
    {type: 'category', label: 'MCP', collapsible: false, items: ['mcp', 'clients', 'alongside', 'private']},
    'api',
    'cli',
  ],
};

export default sidebars;

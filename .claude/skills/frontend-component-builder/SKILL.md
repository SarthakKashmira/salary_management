---
name: react-frontend-builder
description: Builds, modifies, and refactors React frontend components using the project's existing packages, Ant Design conventions, internationalization, SEO metadata, responsive design, and established architecture. Use whenever implementing or modifying frontend UI components, pages, layouts, forms, tables, or related components.
---

# React Frontend Builder

## 1. Primary Objective

Build high-quality, reusable, maintainable, and responsive React frontend components while strictly following the existing project's architecture and conventions.

The primary objective is to reuse the packages, utilities, components, hooks, and design patterns already available in the project.

**Never introduce a new dependency when the existing project packages can accomplish the task.**

Do not assume the project structure, package APIs, component conventions, or utility implementations. Inspect the codebase before implementing anything.

## 2. Mandatory Initial Inspection

Before writing or modifying any frontend code:

1. Inspect `package.json` to identify installed dependencies.
2. Inspect the existing React application structure.
3. Identify the existing component directory and naming conventions.
4. Identify existing shared components, hooks, layouts, and utilities.
5. Identify the translation directory and existing translation structure.
6. Inspect existing routing conventions.
7. Inspect existing SEO and metadata implementations.
8. Identify the project's styling approach (CSS, SCSS, CSS Modules, styled-components, etc.).
9. Identify existing responsive design conventions.

### Mandatory Ant Design Documentation

Before implementing any UI component, read:

`.claude/skills/antd/SKILL.md`

This file contains the project's Ant Design conventions and must be treated as the primary reference for using Ant Design.

Follow its instructions when selecting components, using props, handling styling, and composing UI elements.

Do not duplicate or contradict the conventions documented there.

## 3. Package and Dependency Rules

Use only packages that are already installed in the project.

Before implementing a feature:

- Check whether an existing package provides the required functionality.
- Check whether an existing shared component can be reused.
- Check whether an existing project utility can accomplish the task.
- Avoid writing custom implementations when an existing package already provides the functionality.

### Strict Dependency Restrictions

Never:

- Install a new npm package without explicit approval.
- Add a dependency merely for convenience.
- Replace an existing package with another package without approval.
- Introduce a second library for functionality already supported by an installed library.
- Assume that a package is installed without checking `package.json`.

If an additional package is genuinely necessary, do not silently install it or implement an inferior workaround.

Instead, complete all possible work using existing dependencies and report the missing dependency in the final response under the **CRITICAL ASK** section.

## 4. Ant Design as the Primary UI Library

Ant Design must be the primary UI library for building frontend components.

Use Ant Design even for small and seemingly insignificant UI elements.

Examples include:

| UI element | Preferred implementation |
|---|---|
| Buttons | Ant Design Button |
| Paragraphs | Ant Design Typography.Paragraph |
| Headings | Ant Design Typography.Title |
| Inline text | Ant Design Typography.Text |
| Alerts | Ant Design Alert |
| Callouts | Ant Design Alert or an appropriate existing shared component |
| Forms | Ant Design Form |
| Inputs | Ant Design Input |
| Selects | Ant Design Select |
| Checkboxes | Ant Design Checkbox |
| Radio buttons | Ant Design Radio |
| Switches | Ant Design Switch |
| Modals | Ant Design Modal |
| Drawers | Ant Design Drawer |
| Tooltips | Ant Design Tooltip |
| Dropdowns | Ant Design Dropdown |
| Tables | Ant Design Table |
| Pagination | Ant Design Pagination |
| Tags | Ant Design Tag |
| Breadcrumbs | Ant Design Breadcrumb |
| Empty states | Ant Design Empty |
| Loading states | Ant Design Spin or Skeleton |

This is a preferred component mapping, not an instruction to ignore existing project-specific shared components.

### UI Implementation Rules

1. Prefer Ant Design components over native HTML elements when a corresponding UI component exists.
2. Do not create custom buttons when Ant Design Button is available.
3. Do not use plain paragraphs when Ant Design Typography.Paragraph is appropriate.
4. Do not create custom alert or callout implementations when Ant Design Alert can serve the purpose.
5. Use Ant Design's built-in variants, sizes, statuses, and properties wherever possible.
6. Reuse existing shared components before creating new ones.
7. Avoid unnecessary wrappers and deeply nested component structures.
8. Maintain consistent spacing, typography, colors, and visual hierarchy.
9. Use the existing theme and design tokens.
10. Do not introduce arbitrary colors or hardcoded design values when project tokens are available.

Use native HTML elements where semantic structure requires them, such as `main`, `section`, `nav`, `article`, and `form`.

## 5. Internationalization (Mandatory)

All user-facing text must be internationalized.

The English translations must be stored in:

`translations/en.json`

Before adding translations:

1. Inspect the existing translation directory.
2. Read the existing `en.json`.
3. Understand its current structure and naming conventions.
4. Reuse existing translation keys whenever appropriate.
5. Add only the missing translation keys.

### Translation Implementation

Use `react-i18next` and the `useTranslation` hook.

Expected pattern:

```jsx
import { useTranslation } from "react-i18next";

const EmployeeDetails = () => {
  const { t } = useTranslation();

  return (
    <Typography.Title>
      {t("employee_details.title")}
    </Typography.Title>
  );
};
```

### Translation Rules

All user-visible content must come from translation keys, including:

- Page headings.
- Paragraphs.
- Descriptions.
- Button labels.
- Form labels.
- Placeholders.
- Tooltips.
- Alert messages.
- Callout messages.
- Empty-state messages.
- Loading messages.
- Success messages.
- Error messages.
- Confirmation messages.
- Table column headings.
- Table action labels.
- Modal titles.
- Dropdown options.
- Validation messages.
- Accessibility labels where applicable.

Never hardcode user-facing strings directly in JSX.

Incorrect:

```jsx
<Button>Save Employee</Button>
```

Correct:

```jsx
<Button>{t("employees.save")}</Button>
```

### Translation Key Conventions

- Use descriptive, meaningful translation keys.
- Follow the existing project's namespace and nesting conventions.
- Avoid duplicate translation values and unnecessary keys.
- Keep translation files organized by feature or domain.
- Do not put technical identifiers, API values, or internal variable names into translation files.
- Do not translate values dynamically generated by the backend unless the application has an established mechanism for doing so.

Whenever new text is introduced into a component, update `translations/en.json` in the same implementation.

Never leave missing translation keys or use hardcoded fallback English strings to conceal missing translations.

## 6. SEO and Metadata

SEO must be considered whenever creating a main page or route-level component.

Use the project's existing `withT` utility from its i18n package to define translated metadata.

### Mandatory Inspection

Before implementing metadata:

1. Locate the existing i18n package and its `withT` implementation.
2. Inspect existing components that use `withT`.
3. Follow the exact function signature and established usage.
4. Do not invent or assume the API of `withT`.

### SEO Requirements

For each main page or route-level component, implement appropriate metadata using the existing `withT` pattern.

Consider:

- Page title.
- Meta description.
- Relevant keywords when appropriate.
- Open Graph title and description where supported.
- Canonical URL where applicable.
- Other existing project-specific metadata conventions.

All metadata content must also be translated through the project's translation system.

Avoid creating unnecessary metadata for small internal components, buttons, or reusable UI primitives.

SEO metadata must be unique and relevant to the page.

Do not duplicate metadata implementations when the application already provides a shared mechanism.

## 7. Responsive Design

Every component must be responsive.

Do not assume that the application will only be used on desktop screens.

Consider the following screen categories:

- Mobile: approximately 320px–575px.
- Tablet: approximately 576px–991px.
- Desktop: approximately 992px–1199px.
- Large desktop: 1200px and above.

These are design considerations, not mandatory breakpoint definitions. Prefer the existing project's breakpoints and Ant Design's responsive utilities.

### Responsive Design Requirements

1. Avoid fixed widths when fluid layouts are appropriate.
2. Avoid horizontal overflow.
3. Ensure buttons and interactive elements remain usable on touch devices.
4. Make forms adapt to smaller screens.
5. Ensure tables have an appropriate mobile presentation, such as horizontal scrolling or an alternative layout.
6. Adjust spacing and typography according to screen size.
7. Ensure modals and drawers fit smaller viewports.
8. Make navigation and sidebars responsive.
9. Prevent text from overflowing its container.
10. Ensure images and other media scale appropriately.

Always consider responsive behavior while implementing the component, rather than treating it as a final optional step.

## 8. Component Architecture and File Organization

Build reusable components with clear responsibilities and follow the existing project structure.

### General Principles

- Follow the existing folder structure.
- Follow existing file naming conventions.
- Prefer functional React components.
- Use hooks appropriately.
- Keep components focused on a single responsibility.
- Extract reusable UI elements when they provide meaningful reuse.
- Avoid unnecessarily large components.
- Avoid premature abstraction.
- Keep business logic separate from presentation where appropriate.
- Reuse existing shared hooks and utilities.
- Avoid duplicated logic.
- Use clear and descriptive variable and function names.
- Follow the project's existing JavaScript or TypeScript conventions.

### Component-Specific Constants

Constants that are used only by one component must be placed in a `constants.js` file within that component's directory.

For example:

```text
employees/
  EmployeePage/
    index.jsx
    constants.js
    Header/
      index.jsx
    Table/
      index.jsx
```

If a constant is specific to `EmployeePage`, define it in:

`EmployeePage/constants.js`

Do not place component-specific constants in a global constants file.

### Helper Functions and Utilities

Follow this placement hierarchy:

1. **Component-specific helper:** If a helper is used only by one component, keep it close to that component, preferably in its component file when small or in a local `utils.js` / `utils.jsx` when separation improves readability.
2. **Feature-local shared helper:** If a helper is used in multiple files/components within the same feature or directory scope, place it in that feature's `utils.js` or `utils.jsx`, as appropriate.
3. **Cross-folder shared helper:** If a helper is used by components located in different folders, place it in:

   `app/javascript/constants/index.js`

   This is the required central location for helper functions shared across different component folders.

Before adding a helper, search for an existing implementation and reuse it where appropriate. Do not create duplicate helpers.

Use `utils.js` for plain JavaScript utilities. Use `utils.jsx` only when the helper genuinely needs to contain or return JSX.

Do not put component-specific helper functions in the global `constants/index.js`.

### API Calls and Data Fetching

Components must never call `axios` directly and must never build URLs inline. Data access is layered:

```text
component  ->  hook (React Query)  ->  api module (axios)  ->  Rails
```

**1. API module — `app/apis/<resource>.js`**

One module per resource, named in the singular. Each function performs a single request and returns the axios promise untouched. URLs are relative, because `app/apis/axios.js` already sets `axios.defaults.baseURL`. Export a single default object grouping the functions.

```js
import axios from "axios";

const employeesUrl = "/employees";

const fetchEmployees = params => axios.get(employeesUrl, { params });

const employeeApi = { fetchEmployees };

export default employeeApi;
```

Rules:

- Do not unwrap `response.data` here; that belongs in the hook.
- Do not call `toast` here; `app/apis/axios.js` interceptors already report success and failure.
- Do not catch errors here; let them reach the interceptor and the caller.
- Keep request shaping (params, payload, headers) in this layer.

**2. Query keys — `app/javascript/constants/queryKeys.js`**

Every cached resource needs a key declared in the shared `QUERY_KEYS` object. Never inline a raw string as a query key: a typo silently creates a second cache entry that invalidation will never reach.

**3. Hook — `app/javascript/hooks/use<Resource>Api.js`**

Hooks are the only place React Query is used. Name read hooks `useFetch<Resource>` and write hooks `useCreate/useUpdate/useDelete<Resource>`. Each hook:

- builds its `queryKey` from `QUERY_KEYS` plus the params that vary the result,
- unwraps `response.data` in `queryFn`,
- accepts an `options` object and spreads it last so callers can override.

Keep read hooks a thin wrapper around `useQuery`. Do not return an `invalidate` helper: anything that needs to refresh a query calls `useQueryClient` and invalidates by its `QUERY_KEYS` entry, which keeps invalidation at the call site that actually causes it.

```js
const useFetchEmployees = (params = {}, options = {}) =>
  useQuery({
    queryKey: [EMPLOYEES, params],
    queryFn: async () => {
      const { data } = await employeeApi.fetchEmployees(params);

      return data;
    },
    ...options,
  });
```

Mutations must invalidate every query key whose data they affect, so lists and counts stay correct after a write.

**4. Component**

Components call only the hook, and must handle its `isLoading`, `isError`, and empty states using the Ant Design components named in section 4.

Do not duplicate a request across components; if two components need the same data, they call the same hook and share React Query's cache.

**Response casing:** the Rails API returns `snake_case`. Decide the conversion point once for the project and apply it consistently. Do not convert ad hoc inside components.

### Child Component Naming

Child components belonging to a parent component must have concise, generic names. Do not prefix child component names with the parent component's name.

For example, if the parent component is `EmployeePage`, use:

```text
EmployeePage/
  index.jsx
  constants.js
  Header/
    index.jsx
  Table/
    index.jsx
  Filters/
    index.jsx
  Form/
    index.jsx
```

Do not use:

```text
EmployeePage/
  EmployeeHeader/
  EmployeeTable/
  EmployeeFilters/
  EmployeeForm/
```

The parent directory already provides the context, so repeating its name in every child component is unnecessary.

Apply this convention to component directory names, component filenames, and component identifiers where appropriate.

Use descriptive generic names such as `Header`, `Table`, `Filters`, `Form`, `Actions`, and `EmptyState`.

If a child component is genuinely shared across unrelated parent features, place it in the appropriate shared component location and give it a clear domain-neutral name.

### Related Components

When a feature requires multiple related components, implement the complete component hierarchy.

For example, an employee management page may require:

- EmployeePage
- Header
- Table
- Filters
- Search
- Actions
- Form
- Details
- EmptyState

Do not unnecessarily combine all functionality into one large component.

However, do not create separate files for every trivial JSX element. Keep abstractions meaningful.

### Existing Components First

Before creating a new shared component:

1. Search for an existing component serving the same purpose.
2. Check whether it can be extended or composed.
3. Reuse it if appropriate.
4. Avoid creating duplicate implementations.

## 9. Code Quality

All generated code must follow production-quality standards.

Pay attention to:

- Correct React hooks usage.
- Stable keys when rendering lists.
- Proper event handling.
- Correct form state management.
- Appropriate error handling.
- Loading and empty states.
- Accessibility.
- Semantic HTML.
- Avoiding unnecessary re-renders.
- Avoiding unnecessary state.
- Avoiding duplicated API requests.
- Proper component cleanup where required.
- Type safety if the project uses TypeScript.

Do not suppress linting or TypeScript errors simply to make the implementation pass.

Do not introduce unnecessary dependencies or abstractions.

## 10. Accessibility

Ensure all interactive components are accessible.

Consider:

- Keyboard navigation.
- Appropriate labels.
- ARIA attributes where necessary.
- Accessible form validation.
- Visible focus states.
- Meaningful button labels.
- Appropriate semantic HTML.
- Sufficient color contrast.

Do not rely exclusively on color to communicate status or errors.

## 11. Testing and Verification

After implementing components:

1. Run the relevant lint command if available.
2. Run existing tests related to the modified components.
3. Run type checking if available.
4. Run the relevant build command when practical.
5. Check for missing translation keys.
6. Check for missing metadata.
7. Check for unused imports and variables.
8. Check for responsive layout issues.
9. Verify that existing functionality has not been broken.

Use the scripts already defined in `package.json`.

Do not add testing packages without approval.

If verification cannot be completed, clearly state which checks were not performed and why.

## 12. Implementation Workflow

Follow this sequence for every frontend implementation task.

### Step 1: Understand

Understand the requested feature, expected behavior, and related components.

### Step 2: Inspect

Inspect the existing project, dependencies, Ant Design skill, translations, SEO utilities, and shared components.

### Step 3: Plan

Identify:

- Components to create or modify.
- Existing components to reuse.
- Packages required.
- Translation keys required.
- Metadata required.
- Responsive behavior.
- Constants and helper-function placement.
- Testing requirements.

### Step 4: Implement

Build the components using existing project dependencies and conventions.

### Step 5: Internationalize

Add all missing English translation keys to `translations/en.json` and use `t()` in components.

### Step 6: Implement SEO

Use the existing `withT` pattern for main components.

### Step 7: Verify

Run available checks and review the implementation.

### Step 8: Report

Summarize what was implemented, files modified, verification results, and any outstanding requirements.

## 13. Final Response Format

Every implementation response must follow this structure:

### 1. Implementation Summary

Briefly describe what was implemented.

### 2. Components Created or Modified

List the components created or modified and their responsibilities.

### 3. Packages Used

Mention the existing packages used.

### 4. Translations

Mention the translation keys added or modified in `translations/en.json`.

### 5. SEO

Mention the metadata implemented and how `withT` was used.

### 6. Responsive Design

Mention the responsive behavior implemented.

### 7. File Organization

Mention where component-specific constants, feature-local utilities, and cross-folder shared helpers were placed. Confirm that child components follow the no-parent-prefix naming convention.

### 8. Verification

List the checks performed and their results.

### 9. Outstanding Issues

Mention any unresolved issues or limitations.

### 10. CRITICAL ASK

This section is mandatory in every final implementation report.

If an additional package, dependency, or external requirement is necessary, list it here prominently.

Use this format:

**CRITICAL ASK**

**A new package is required: `package-name`**

- Why it is required.
- What functionality it provides.
- Why the existing installed packages cannot adequately provide that functionality.
- What part of the implementation is affected.

**Do not install the package without explicit approval.**

If no additional packages are needed, explicitly write:

**CRITICAL ASK: NONE**

If approval is needed for another important architectural or implementation decision, list it here as well.

Never hide dependency requirements inside ordinary implementation notes.

## 14. Non-Negotiable Rules

1. Existing project architecture takes priority over personal preferences.
2. Read `.claude/skills/antd/SKILL.md` before implementing UI.
3. Use installed packages only unless explicitly approved otherwise.
4. Ant Design is the primary UI library.
5. Use Ant Design Typography for appropriate text elements.
6. All user-facing content must be translated through `react-i18next`.
7. Store English translations in `translations/en.json`.
8. Use `withT` for main-component SEO metadata, following the existing implementation.
9. Every component must consider responsive screen sizes.
10. Reuse existing components and utilities wherever possible.
11. Component-specific constants belong in that component's `constants.js`.
11a. Components never call `axios` directly: requests live in `app/apis/<resource>.js`, React Query lives in `app/javascript/hooks/use<Resource>Api.js`, and query keys come from `constants/queryKeys.js`.
12. Feature-local shared helpers belong in that feature's `utils.js` or `utils.jsx`.
13. Helpers shared across components in different folders belong in `app/javascript/constants/index.js`.
14. Child components must not repeat the parent component's name as a prefix.
15. Never silently install dependencies.
16. Always include the CRITICAL ASK section in the final response.

These rules are mandatory unless the user explicitly instructs otherwise.

# Automated API Generation Project

## Project Overview
This project automates the generation of APIs based on provided entity files. It sets up the necessary directories, creates Data Transfer Objects (DTOs), resources, and entities, and configures the application module for a new project. The code is organized to ensure that the generated API adheres to a predefined boilerplate structure, making it easier to create scalable and maintainable applications.

## Author
**Farquleet Farhat Gondal**

## Project Structure
- **Entities Folder (`entities`)**: Contains the entity files used as the basis for generating the API.
- **New Project Folder (`my_pro`)**: This is where the new project with the generated API structure will be created.
- **Boilerplate Folder (`boilerPlate`)**: Contains the boilerplate code used as a template for generating the new API structure.

## Script Breakdown

### `projDirCreator.js`
Creates the directory structure in the new project folder by copying the directories from the boilerplate.

### `dtoCreator.js`
Generates default DTOs for each entity. It creates DTOs for operations like `create`, `update`, `findOne`, `findAll`, and `history`. The generated DTOs are placed in the `dto` directory under each entity folder.

### `resourceCreator.js`
Copies resource files (e.g., controllers, services, and modules) from the boilerplate and adapts them for the specific entities.

### `constFileCopier.js`
Copies constant files (e.g., utilities, authentication modules) from the boilerplate to the new project's `src` folder. It also updates roles in the role guard for every endpoint.

### `entityReader.js`
Reads the entity files to extract information about the entity's attributes, their types, and relationships with other entities. This information is used to generate the entity content for the new project.

### `historyEntityContent.js`
Generates content for the history entities based on the original entity. The history entities track changes over time.

### `appModuleChanges.js`
Updates the `app.module.ts` file in the new project by importing the generated modules for each entity and adding them to the module's imports array.

## How to Use
1. **Set Up Entities**: Place your entity files in the `entities` folder.
2. **Run the Script**: Execute the main script to generate the API structure. The script will:
   - Create necessary directories.
   - Generate DTOs.
   - Create entity and history entity files.
   - Copy resource files.
   - Update the `app.module.ts` file.

3. **Result**: The new project structure will be created in the `my_pro` folder, ready for further development and deployment.

## Notes
- Ensure that the paths to the entities, boilerplate, and new project are correctly set.
- The script is designed to handle most common scenarios, but you may need to make adjustments depending on the specific requirements of your project.

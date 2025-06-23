import React, { useState } from 'react';
import { Button, Checkbox } from '@heroui/react';
import { Input } from '@heroui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

interface TemplateSubpoint {
  id: string;
  title: string;
  mediaRequired: boolean;
  textReportRequired: boolean;
}

interface TemplateBlock {
  id: string;
  title: string;
  subpoints: TemplateSubpoint[];
  // New fields for block-level reporting, conditional on no subpoints
  mediaRequired: boolean;
  textReportRequired: boolean;
}

interface Template {
  id: string;
  name: string;
  blocks: TemplateBlock[];
}

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplateName, setCurrentTemplateName] = useState('');
  const [currentBlocks, setCurrentBlocks] = useState<TemplateBlock[]>([]);

  // State for adding new block
  const [newBlockTitle, setNewBlockTitle] = useState('');
  const [newBlockMediaRequired, setNewBlockMediaRequired] = useState(false); // For block-level reporting
  const [newBlockTextReportRequired, setNewBlockTextReportRequired] = useState(false); // For block-level reporting

  // States for adding new subpoint to the *currently being created* block
  const [newSubpointTitle, setNewSubpointTitle] = useState('');
  const [newSubpointMediaRequired, setNewSubpointMediaRequired] = useState(false);
  const [newSubpointTextReportRequired, setNewSubpointTextReportRequired] = useState(false);

  const addSubpointToCurrentBlock = (blockId: string) => {
    if (newSubpointTitle.trim() === '') {
      alert('Subpoint Title is required!');
      return;
    }
    if (!newSubpointMediaRequired && !newSubpointTextReportRequired) {
      alert('At least one reporting type (Media or Text Report) must be enabled for a Subpoint!');
      return;
    }

    const newSubpoint: TemplateSubpoint = {
      id: Date.now().toString(),
      title: newSubpointTitle,
      mediaRequired: newSubpointMediaRequired,
      textReportRequired: newSubpointTextReportRequired,
    };

    setCurrentBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId
          ? { ...block, subpoints: [...block.subpoints, newSubpoint] }
          : block
      )
    );

    setNewSubpointTitle('');
    setNewSubpointMediaRequired(false);
    setNewSubpointTextReportRequired(false);
  };

  const deleteSubpointFromCurrentBlock = (blockId: string, subpointId: string) => {
    setCurrentBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId
          ? { ...block, subpoints: block.subpoints.filter(sp => sp.id !== subpointId) }
          : block
      )
    );
  };

  const addBlock = () => {
    if (newBlockTitle.trim() === '') {
      alert('Block Title is required!');
      return;
    }
    const newBlock: TemplateBlock = {
      id: Date.now().toString(),
      title: newBlockTitle,
      subpoints: [], // Blocks start with no subpoints
      mediaRequired: newBlockMediaRequired, // Initialize block-level reporting
      textReportRequired: newBlockTextReportRequired, // Initialize block-level reporting
    };
    setCurrentBlocks([...currentBlocks, newBlock]);
    setNewBlockTitle('');
    setNewBlockMediaRequired(false); // Reset for next block
    setNewBlockTextReportRequired(false); // Reset for next block
  };

  const updateBlockReporting = (blockId: string, field: 'mediaRequired' | 'textReportRequired', value: boolean) => {
    setCurrentBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId
          ? { ...block, [field]: value }
          : block
      )
    );
  };

  const deleteBlock = (id: string) => {
    setCurrentBlocks(currentBlocks.filter(block => block.id !== id));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = currentBlocks.findIndex(block => block.id === id);
    if (index === -1) return;

    const newBlocks = [...currentBlocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
    }
    setCurrentBlocks(newBlocks);
  };

  const addTemplate = () => {
    if (currentTemplateName.trim() === '') {
      alert('Template Name is required!');
      return;
    }
    if (currentBlocks.length === 0) {
      alert('A template must have at least one Block!');
      return;
    }
    // Validate that each block with subpoints has at least one subpoint
    const blocksWithNoSubpoints = currentBlocks.filter(block => block.subpoints.length === 0 && !block.mediaRequired && !block.textReportRequired);
    if (blocksWithNoSubpoints.length > 0) {
      alert('All blocks must either have subpoints or define their own reporting requirements!');
      return;
    }

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: currentTemplateName,
      blocks: currentBlocks,
    };
    setTemplates([...templates, newTemplate]);
    setCurrentTemplateName('');
    setCurrentBlocks([]);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Template Builder</h1>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Create New Template</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <Input
            label="Template Name"
            placeholder="Enter template name (e.g., Oil Change Service)"
            value={currentTemplateName}
            onChange={(e) => setCurrentTemplateName(e.target.value)}
            isRequired
          />

          <div className="border p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-medium">Add New Block</h3>
            <Input
              label="Block Title"
              placeholder="Enter block title (required)"
              value={newBlockTitle}
              onChange={(e) => setNewBlockTitle(e.target.value)}
              isRequired
            />
            <div className="flex space-x-4">
              <Checkbox
                isSelected={newBlockMediaRequired}
                onValueChange={setNewBlockMediaRequired}
              >
                Media Required? (Block-level)
              </Checkbox>
              <Checkbox
                isSelected={newBlockTextReportRequired}
                onValueChange={setNewBlockTextReportRequired}
              >
                Text Report Required? (Block-level)
              </Checkbox>
            </div>
            <Button color="secondary" onPress={addBlock}>
              Add Block
            </Button>
          </div>

          {currentBlocks.length > 0 && (
            <div className="border p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-medium">Current Template Blocks</h3>
              <div className="relative pl-6">
                <AnimatePresence initial={false}>
                  {currentBlocks.map((block, blockIndex) => (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 last:mb-0 relative"
                    >
                      {/* Vertical line for blocks */}
                      {blockIndex < currentBlocks.length - 1 && (
                        <div className="absolute left-2.5 top-6 bottom-[-16px] w-0.5 bg-primary-300"></div>
                      )}
                      {/* Node dot for block */}
                      <div className="absolute left-0 top-2.5 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
                        {blockIndex + 1}
                      </div>
                      <Card className="ml-6 p-3">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
                          <p className="font-semibold">Block: {block.title}</p>
                          <div className="flex space-x-2 mt-2 md:mt-0">
                            <Button isIconOnly variant="light" size="sm" onPress={() => moveBlock(block.id, 'up')} isDisabled={blockIndex === 0}>
                              <Icon icon="lucide:arrow-up" width={18} />
                            </Button>
                            <Button isIconOnly variant="light" size="sm" onPress={() => moveBlock(block.id, 'down')} isDisabled={blockIndex === currentBlocks.length - 1}>
                              <Icon icon="lucide:arrow-down" width={18} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm" onPress={() => deleteBlock(block.id)}>
                              <Icon icon="lucide:trash" width={18} />
                            </Button>
                          </div>
                        </div>

                        {/* Conditional Block-level reporting checkboxes */}
                        {block.subpoints.length === 0 && (
                          <div className="flex space-x-4 mb-4">
                            <Checkbox
                              isSelected={block.mediaRequired}
                              onValueChange={(value) => updateBlockReporting(block.id, 'mediaRequired', value)}
                            >
                              Media Required? (Block-level)
                            </Checkbox>
                            <Checkbox
                              isSelected={block.textReportRequired}
                              onValueChange={(value) => updateBlockReporting(block.id, 'textReportRequired', value)}
                            >
                              Text Report Required? (Block-level)
                            </Checkbox>
                          </div>
                        )}

                        {/* Subpoint creation for this block */}
                        <div className="border-t pt-4 mt-4 space-y-3">
                          <h4 className="text-md font-medium">Add Subpoint to "{block.title}"</h4>
                          <Input
                            label="Subpoint Title"
                            placeholder="Enter subpoint title (required)"
                            value={newSubpointTitle}
                            onChange={(e) => setNewSubpointTitle(e.target.value)}
                            isRequired
                          />
                          <div className="flex space-x-4">
                            <Checkbox
                              isSelected={newSubpointMediaRequired}
                              onValueChange={setNewSubpointMediaRequired}
                            >
                              Media Required?
                            </Checkbox>
                            <Checkbox
                              isSelected={newSubpointTextReportRequired}
                              onValueChange={setNewSubpointTextReportRequired}
                            >
                              Text Report Required?
                            </Checkbox>
                          </div>
                          <Button color="success" size="sm" onPress={() => addSubpointToCurrentBlock(block.id)}>
                            Add Subpoint
                          </Button>
                        </div>

                        {/* Display subpoints for this block */}
                        {block.subpoints.length > 0 && (
                          <div className="mt-4 pt-4 border-t space-y-2">
                            <h4 className="text-md font-medium">Subpoints:</h4>
                            {block.subpoints.map((subpoint, subpointIndex) => (
                              <div key={subpoint.id} className="flex items-center justify-between p-2 border rounded-md">
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{subpointIndex + 1}. {subpoint.title}</p>
                                  <div className="flex space-x-2 text-xs text-gray-600">
                                    {subpoint.mediaRequired && <span className="flex items-center"><Icon icon="lucide:image" width={14} className="mr-1" />Media</span>}
                                    {subpoint.textReportRequired && <span className="flex items-center"><Icon icon="lucide:file-text" width={14} className="mr-1" />Text</span>}
                                  </div>
                                </div>
                                <Button isIconOnly variant="light" color="danger" size="sm" onPress={() => deleteSubpointFromCurrentBlock(block.id, subpoint.id)}>
                                  <Icon icon="lucide:trash" width={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </CardBody>
        <CardFooter>
          <Button color="primary" onPress={addTemplate} isDisabled={currentBlocks.length === 0 || currentTemplateName.trim() === ''}>
            Save Template
          </Button>
        </CardFooter>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Existing Templates</h2>
      {templates.length === 0 ? (
        <p>No templates created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{template.name}</h3>
                <Button isIconOnly variant="light" color="danger" size="sm" onPress={() => deleteTemplate(template.id)}>
                  <Icon icon="lucide:trash" width={18} />
                </Button>
              </CardHeader>
              <CardBody className="space-y-2">
                <div className="relative pl-6">
                  {template.blocks.map((block, blockIndex) => (
                    <div key={block.id} className="mb-4 last:mb-0 relative">
                      {/* Vertical line for blocks */}
                      {blockIndex < template.blocks.length - 1 && (
                        <div className="absolute left-2.5 top-6 bottom-[-16px] w-0.5 bg-primary-300"></div>
                      )}
                      {/* Node dot for block */}
                      <div className="absolute left-0 top-2.5 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
                        {blockIndex + 1}
                      </div>
                      <div className="ml-6 p-3 border rounded-lg">
                        <p className="font-semibold">Block: {block.title}</p>
                        {block.subpoints.length === 0 && (
                          <div className="flex space-x-2 text-sm text-gray-600 mt-1">
                            {block.mediaRequired && <span className="flex items-center"><Icon icon="lucide:image" width={14} className="mr-1" />Media (Block)</span>}
                            {block.textReportRequired && <span className="flex items-center"><Icon icon="lucide:file-text" width={14} className="mr-1" />Text (Block)</span>}
                            {!block.mediaRequired && !block.textReportRequired && <span className="text-gray-500">No reporting required at block level.</span>}
                          </div>
                        )}
                        {block.subpoints.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <h4 className="text-sm font-medium">Subpoints:</h4>
                            {block.subpoints.map((subpoint, subpointIndex) => (
                              <div key={subpoint.id} className="flex items-center space-x-2 text-sm">
                                <span className="font-medium">{subpointIndex + 1}. {subpoint.title}</span>
                                {subpoint.mediaRequired && <Icon icon="lucide:image" width={16} className="text-blue-500" />}
                                {subpoint.textReportRequired && <Icon icon="lucide:file-text" width={16} className="text-green-500" />}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;

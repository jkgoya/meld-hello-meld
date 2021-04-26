# Re-establish link to local meld-clients-core package

mv ../../meld-clients-core/node_modules_save ../../meld-clients-core/node_modules
npm link meld-clients-core
mv ../../meld-clients-core/node_modules ../../meld-clients-core/node_modules_save

